//Brief summary of the theory.

//The main difference from Enzyme: we do not rely on implementation details
//(but checking the main functionality;
//which means: does not hinder the speed of product development due to code refactoring or new implementations),
//i.e. we are looking for an element not by class, tag, etc., but, for example,
//by the text that is in it.

//By abstracting from the internal implementation and from focusing on the internal functionality of the component,
// we get a stable test that works consistently in the long term.

//The main principle: The more the testing process resembles a real session of working with the application,
//the more likely it is that when the application enters production,
//it will work as expected.

//Instead of working with instances of the rendered React components (as in the case of Enzyme), tests will interact with real DOM nodes.

//The mechanisms provided by the library perform DOM access in the same way as the users of the product would do.
//That is why the main idea of finding elements is a text-based approach.
//There is an alternative search option: using the attribute ?data test id?
//(idea: a common practice that allows you to work with elements whose labels do not make sense or are not practical for this purpose).

//The library is not interested in the internal implementation of the component logic. The final result is important to her,
//it is with it that we will interact (i.e., in fact, we are working with ready-made markup and we do not need pictures).

//Usage:
// 1) to find an element, use - getBy
// 2) to show that the item is not in the DOM - queryBy
// 3) to show that initially there was no element, but when the asynchronous code is running, it will appear - findBy
// if multiple items getAllBy, findAllBy, queryAllBy

import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";

test("1", async () => {
  render(<App/>);

  expect(screen.getByAltText(/preloader/i)).toHaveAttribute('src', 'preloader.gif');

  expect(await screen.findByAltText(/socialLogo/i)).toHaveAttribute('src', 'socialLogo.png');
  expect(await screen.findByAltText(/socialLogo/i)).toBeEmpty();
  expect(await screen.findByAltText(/preloader/i)).toHaveClass('smallPreloader');
  expect(await screen.findByText(/Profile/i)).toHaveClass('navbarItemWrapper');
  expect(await screen.findByText(/Messages/i)).toHaveAttribute('href', '#/messages');
  expect(await screen.findByLabelText(/login/i)).toHaveAttribute('name', 'login');
  expect(await screen.findAllByPlaceholderText(/Write something here.../i)).toHaveLength(2);
  expect(await screen.findAllByRole('button')).toHaveLength(2);
  expect(await screen.findAllByDisplayValue('')).toHaveLength(3);
  expect(await screen.findByText('Log in')).toHaveClass('active');
  expect(await screen.findByText('Log in')).toHaveAttribute('href', '#/login');

  screen.debug();
})