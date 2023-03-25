import { BookCard } from "./BookCard"

export const BooksList = ({ books }) => {
    return (
        <div>
            {books.length > 0 ? books.map(item => {
                return <BookCard key={item.id} title={item.volumeInfo.title} />
            }) : <div>We Don't Have Book With This Name</div>}

        </div>

    )
}