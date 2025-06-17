import React, { useState } from 'react'
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';

type Props = {}

const InfiniteScroller = (props: Props) => {
   const [items, setItems] = useState<string[]>([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const pageSize = 5

    const loadMoreRows = async ({ startIndex, stopIndex }:{ startIndex:number, stopIndex:number }) => {
        console.log('Loading rows from:', startIndex, 'to:', stopIndex);
       
        const response = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${startIndex}`)

        const data = await response.json();

        setItems(prevItems => {
        const newItems:any[] = [...prevItems];
        data.users.forEach((item: any, idx: number) => {
            newItems[startIndex + idx] = item.email;
        });
        return newItems;
        });

        if (data.users.length < pageSize) {
        setHasNextPage(false);
        }
        
    };

    const isRowLoaded = ({ index }:{index:number}) => {
        // this function gets called on on scroll event or when the end of list is triggered
        console.log("isRowLoaded",index,items[index])
        return !!items[index];
    };

    const rowRenderer = ({ index, key, style }:any) => {
        return (
            <div key={key} style={style}>
                {items[index] || 'Loading...'}
            </div>
        );
    };

    return (
        <div style={{ height: '200px' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={hasNextPage ? Math.max(items.length, pageSize) + 1 : items.length}
                        threshold={5}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                height={height}
                                width={width}
                                rowCount={hasNextPage ? items.length + 1 : items.length}
                                rowHeight={40}
                                rowRenderer={rowRenderer}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                            />
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </div>
    );
}

export default InfiniteScroller