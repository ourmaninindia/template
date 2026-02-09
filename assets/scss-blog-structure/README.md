# SCSS Blog Structure

A professional, modular SCSS architecture following industry best practices (7-1 Pattern).

## 📁 Folder Structure

```
scss/
├── main.scss                 # Main entry file that imports all partials
├── abstracts/               # Tools and helpers
│   ├── _variables.scss     # Variables, colors, spacing, typography
│   └── _mixins.scss        # Reusable mixins and functions
├── base/                   # Foundation styles
│   ├── _reset.scss        # CSS reset and normalize
│   └── _typography.scss   # Typography rules
├── components/             # Reusable components
│   ├── _buttons.scss      # Button styles
│   ├── _cards.scss        # Card components (blog posts, etc.)
│   ├── _forms.scss        # Form inputs and search
│   ├── _widgets.scss      # Sidebar widgets
│   └── _pagination.scss   # Pagination components
├── layout/                 # Layout structure
│   ├── _navigation.scss   # Header and navigation
│   ├── _grid.scss         # Main grid layouts
│   ├── _sidebar.scss      # Sidebar layout
│   └── _footer.scss       # Footer (placeholder)
├── pages/                  # Page-specific styles
│   ├── _blog.scss         # Blog listing page
│   └── _single-post.scss  # Single post page
├── themes/                 # Theme variations (optional)
└── vendors/                # Third-party CSS (optional)
```

## 🎯 Architecture Benefits

### 1. **Abstracts** (`abstracts/`)
Contains all SCSS tools and helpers that don't output CSS directly:
- **Variables**: All design tokens (colors, spacing, typography)
- **Mixins**: Reusable code patterns (responsive design, transitions, etc.)

### 2. **Base** (`base/`)
Contains foundational styles that establish defaults:
- **Reset**: Box-sizing, margin/padding resets
- **Typography**: Base font styles, heading defaults

### 3. **Components** (`components/`)
Self-contained, reusable UI components:
- **Buttons**: All button variations
- **Cards**: Blog post cards, content cards
- **Forms**: Input fields, search bars
- **Widgets**: Sidebar widget styles
- **Pagination**: Navigation between pages/posts

### 4. **Layout** (`layout/`)
Major structural sections:
- **Navigation**: Header, menu, language switcher
- **Grid**: Main container and grid systems
- **Sidebar**: Sidebar structure and positioning
- **Footer**: Footer structure

### 5. **Pages** (`pages/`)
Page-specific styles that aren't reusable:
- **Blog**: Blog listing page overrides
- **Single Post**: Individual post page styles

## 🚀 Usage

### Compiling SCSS

#### Using Node-Sass or Dart Sass:
```bash
# Install
npm install

# Compile (development)
npm run scss:dev

# Compile (production - compressed)
npm run scss:build

# Watch for changes
npm run scss:watch
```

#### Manual compilation:
```bash
sass scss/main.scss static/css/style.css
```

### Importing in HTML
```html
<link rel="stylesheet" href="/static/css/style.css">
```

## 📝 Best Practices

### 1. **Partial Naming**
All SCSS files except `main.scss` should be prefixed with underscore (`_filename.scss`). This tells Sass these are partials and shouldn't be compiled into separate CSS files.

### 2. **Import Order Matters**
The order in `main.scss` is crucial:
1. Abstracts first (variables, mixins)
2. Base styles
3. Layout
4. Components
5. Pages

### 3. **Variables First**
Always use variables from `abstracts/_variables.scss` instead of hardcoding values:
```scss
// ✅ Good
color: $color-primary;
padding: $spacing-md;

// ❌ Bad
color: #2563eb;
padding: 24px;
```

### 4. **Use Mixins**
Leverage mixins from `abstracts/_mixins.scss`:
```scss
// Responsive design
.element {
  @include respond-to(tablet) {
    display: block;
  }
}

// Hover states
.button {
  @include hover-state {
    background: $color-primary-dark;
  }
}

// Transitions
.link {
  @include transition(color, background);
}
```

### 5. **Component Isolation**
Each component should be self-contained and reusable. Avoid deep nesting.

### 6. **Grid Template Areas**
This structure heavily uses CSS Grid with named template areas for clear, maintainable layouts:
```scss
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

## 🎨 Customization

### Changing Colors
Edit `scss/abstracts/_variables.scss`:
```scss
$color-primary: #your-color;
```

### Adjusting Spacing
Modify spacing scale in variables:
```scss
$spacing-md: clamp(16px, 3vw, 24px);
```

### Adding New Components
1. Create `scss/components/_your-component.scss`
2. Import in `main.scss`:
```scss
@import 'components/your-component';
```

## 🔧 Configuration

### Browser Support
Supports modern browsers with CSS Grid and custom properties. For older browser support, consider using Autoprefixer.

### Responsive Design
Uses a mobile-first approach with container queries and media query mixins.

## 📦 File Sizes

| File | Purpose | Approx. Lines |
|------|---------|---------------|
| `main.scss` | Master import file | 20 |
| `abstracts/_variables.scss` | Design tokens | 80 |
| `abstracts/_mixins.scss` | Helper functions | 90 |
| `base/*` | Foundation | 60 |
| `layout/*` | Structure | 150 |
| `components/*` | UI components | 300 |
| `pages/*` | Page-specific | 100 |

## 🎓 Learn More

- [Sass Guidelines](https://sass-guidelin.es/)
- [7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [BEM Methodology](http://getbem.com/)

## 📄 License

This structure is provided as a template for your projects.
