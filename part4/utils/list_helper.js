const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    let filtered = blogs.filter(blog => blog.likes === maxLikes)
    return filtered[0]
}

const mostBlogs = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    const authorList = Object.keys(authors)
    const authorCount = authorList.map(author => {
        return {
            author: author,
            blogs: authors[author].length
        }
    })
    return lodash.maxBy(authorCount, 'blogs')
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    const authorList = Object.keys(authors)
    const authorLikes = authorList.map(author => {
        return {
            author: author,
            likes: authors[author].reduce((acc, blog) => acc + blog.likes, 0)
        }
    })
    return lodash.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}