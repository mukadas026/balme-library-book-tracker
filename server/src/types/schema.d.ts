interface UserSchema {
    _id: string
    name: string
    email: string
    password: string
    accessLevel: 1 | 2
    position: string
    image: string
}

interface BookSchema {
    _id: string
    title: string
    description: string
    category: string
    count: number
    borrowed: number
    serialNumber: string
    img:string
}

interface BorrowBook {
    userID: string
    bookID: string
}