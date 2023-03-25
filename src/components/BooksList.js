import { BookCard } from "./BookCard"

export const BooksList = ({ books }) => {

    return (
        <div>
            {books ? books.items.map(item => {
                return <BookCard title={item.volumeInfo.title} />
            }) : <div>We Don't Have Book With This Name</div>}
        </div>

    )
}