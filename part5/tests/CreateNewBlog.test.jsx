import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateNewBlog from "../src/components/CreateNewBlogForm";
import { beforeEach, describe } from "vitest";

describe("CreateNewBlog Tests", () => {
    let blog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://test.com",
        likes: 0,
    }

    let token = "testToken"

    const setBlogs = vi.fn()
    const Notify = vi.fn()
    const handleCreate = vi.fn();

    let container

    beforeEach(() => {
        container = render(
            <CreateNewBlog token={token} setBlogs={setBlogs} Notify={Notify} />
        ).container
        
        let form = container.querySelector('#new_blog')
        form.addEventListener('submit', handleCreate)
    })

    test("form is rendered correctly", () => {
        let title = screen.getByLabelText("Title")
        let author = screen.getByLabelText("Author")
        let url = screen.getByLabelText("URL")
        let button = screen.getByText("Create")
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeDefined()
        expect(button).toBeDefined()
    })

    test("form submission works correctly", async () => {
        let title = screen.getByLabelText("Title")
        let author = screen.getByLabelText("Author")
        let url = screen.getByLabelText("URL")
        let button = screen.getByText("Create")

        await userEvent.type(title, blog.title)
        await userEvent.type(author, blog.author)
        await userEvent.type(url, blog.url)
        await userEvent.click(button)
        expect(handleCreate).toHaveBeenCalled(1)
    })
})