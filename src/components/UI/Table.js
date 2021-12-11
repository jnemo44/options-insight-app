export function TableHeader ({children}) {
    return <div className="flex flex-wrap gap-x-2 sm:w-auto sm:text-sm gap-y-2">{children}</div>
}

export function SearchFilter ({children}) {
    return <div className="flex-shrink-0 flex-grow">{children}</div>
}

export function ColumnFilter ({headerGroups}) {
    {return (headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
            column.Filter ? (
            <div key={column.id} className="flex-shrink-0 flex-grow">
                {/* <label for={column.id}>{column.render("Header")}: </label> */}
                {column.render("Filter")}
            </div>
            ) : null
        )
    ))}  
}