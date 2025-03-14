# 🎬 Movie Explorer

A React-based movie explorer app built with Vite, Tailwind CSS, and TypeScript. This project enhances the UI/UX of the given movie dataset, adds sorting, filtering, infinite scrolling, and optimizations for performance.

## 🚀 Features

### ✅ User Experience Enhancements
- Improved application shell with a **header, footer, and layout**.
- **Sorting & filtering**: Movies can be sorted by year, title, and rating.
- **Genre selection** with multiple filtering options.
- **Infinite scrolling** for seamless browsing.
- **Movie details modal** with a structured layout.

### 🔧 Optimizations
- **LocalStorage caching** to reduce redundant API calls.
- **Lazy loading** of components where applicable.
- **Optimized API requests** by reducing unnecessary fetches.

### 🛠️ Testing & Accessibility
- Comprehensive **unit tests** using Vitest & Testing Library.
- Ensured **ARIA roles and labels** for accessibility compliance.
- Verified application responsiveness across devices.

## 🏃‍♂️ Running the Application

### Backend (Django API)
- `pipenv shell`
- `pip install -r requirements.txt`
- `python manage.py runserver`

### Frontend (React)
- `npm install`
- `npm run start`

## 📌 Project Structure
- Organized folders into:

```txt
src/
├── App.tsx
├── components/
│   ├── Footer/
│   ├── GenreSelector/
│   ├── Header/
│   ├── Modal/
│   ├── MovieCard/
│   ├── MovieDetails/
│   ├── MovieInfo/
│   ├── MovieList/
│   ├── PrincipalCard/
│   ├── PrincipalsList/
│   ├── SearchBar/
│   └── SortDropdown/
├── constants/
│   └── index.ts
├── icons/
│   ├── chevron-down.tsx
│   └── chevron-up.tsx
├── index.css
├── main.tsx
├── services/
│   └── apiService.ts
├── setupTests.ts
├── types/
│   └── index.ts
└── utils/
    └── index.ts
```

- Moved API calls to services/apiService.ts.
- Created utils.ts for reusable functions like formatRuntime.
- Add tests to each component (inside its folder).
- Extract TypeScript types into types folder. 
- Created constants.ts for reusable data.

## 📝 Development Process

### setup (20min)
- Clone the repository
- Download raitings from IMDB website.
- Migrate database to include ratings inside movie.

### Implementing Features & UI Enhancements (3hs)
- Search Functionality	
- Sorting & Filtering	
- Movie Details Modal	
- Styling & Layout Improvements

### Performance Optimization (20min)
- Caching API Calls
- Lazy Loading	
- Infinite Scrolling	

### Writing Unit Tests (30min)
- Unit testing was a key requirement, covering all core components.

### Code improvement and final review (20min)
- Refactored code for better maintainability and readability.
- Ensured consistency in component structure
- Confirm UI and functionality were working as expected
- Write documentation
