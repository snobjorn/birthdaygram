# Birthdaygram

## How to use

### Page title

Edit the `<title>` in `index.html` at root level to your own name for the app.

### Images

Add your images to `/public`. Then edit the file `images.json` in `src/assets/` to include the file names. Demo files included in project.

### Comments

Edit the file `comments.json` in `src/assets/` to include the comments. Comments supports HTML. Example of comments included.

### Logo and favicon

You can change the `logo.png` in `/public` to any name you like. As well as with `favicon.png` if you want to provide another logo symbol and favicon. Note that the default `favicon.png` file has some extra padding in the file itself.

### Other settings

Customize the rest of the app through `settings.json` in `src/assets/`:

- `title`: Set your own name for the app
- `name`: The name of the person whose birthday it is
- `profileText`: Something about the person. Appears in modal when clicking the person's name
- `tooltip`: Text for the tooltip when hovering the tag emoji below the image carousel
- `likes`: Set default number of likes (this should be a number)
- `share`: Set default number of shares (this is a string)
- `birthyear`: Year of when the person was born
- `credits`: Appear in dropdown when clickingthe 3 dot menu in upper right corner. Supports HTML
- `commentsPlaceholder`: Text inside the input field on bottom of page
- `commentsNotification`: Text appearing in notification when clicking the input field or Submit button
