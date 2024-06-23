import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../src/components/Blog";
import { beforeEach } from "vitest";

describe("Blog Tests", () => {
	let container;

	let blog = {
		title: "Test Blog",
		author: "Test Author",
		url: "http://test.com",
		likes: 0,
	};

	let owner = "Test Author";

	const deleteBlog = vi.fn();
	const likeBlog = vi.fn();

	beforeEach(() => {
		container = render(
			<Blog blog={blog} owner={owner} deleteBlog={deleteBlog} likeBlog={likeBlog} />
		).container;
	});

	test("renders blog title and author but not the url & likes by default", () => {
		let author = screen.findByText("Test Author");
		let title = screen.getByText("Test Blog");
		let details = container.querySelector("#details");
		expect(author).toBeDefined();
		expect(title).toBeDefined();
		expect(details.style.display).toBe("none");
	});

	test("url and likes shown when button is pressed", async () => {
		let button = screen.getByText("View");
		await userEvent.click(button);
		let details = container.querySelector("#details");
		expect(details.style.display).toBe("");
	});

    test("likeBlog is called when like button is clicked", async () => {
        let button = screen.getByText("like");
        await userEvent.click(button);
        await userEvent.click(button);
        expect(likeBlog).toHaveBeenCalled(2);
    });

    
});
