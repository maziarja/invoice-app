# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)

- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

## My process

I built this app primarily as a way to practice React Query and React Router after not using them for a while. While I recognize that I could have built a more robust version with Next.js and MongoDB, I intentionally chose React with Supabase to focus on honing my skills with query management and routing.

I’m also aware that the implementation isn’t 100% feature-complete—for example, I didn’t add form validation for creating or editing invoices, nor did I implement different behaviors for saving drafts. These omissions were intentional, as my main goal wasn’t to perfect the app but to reinforce my knowledge of React Query and React Router.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Tailwind
- React
- Supabase

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

One of the key takeaways from this project was learning how to handle initial data more efficiently—not by loading everything upfront (which can be heavier), but by manipulating data when the user actually interacts with it, such as editing or deleting invoices.
