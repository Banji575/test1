import { useCallback, useState } from "react"

export const Header = (props) => {
    const [value, setValue] = useState('')
    const onSearch = () => {
        props.startSearch(true)
        props.search(value)
    }
    const onChangeList = (event) => {
        props.onChangeFilter(event.target.value)
        console.log(event.target.value)
    }
    return (
        <div>
            <h1>Search for Books</h1>
            <div>
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    type='text' />
            </div>
            <div>
                <input type='text' />
                <select onChange={onChangeList}>
                    <option value="all">All</option>
                    <option value="Biography">Biography</option>
                    <option value="Computers">Computers</option>
                    <option value="History">History</option>
                    <option value="Medical">Medical</option>
                    <option value="Poetry">Poetry</option>
                </select>
            </div>
            <button
                onClick={onSearch}
                className='btn'>Search</button>
        </div>
    )
}