# Pros & Cons - Decision Making Tool

A modern React/Next.js web application for creating weighted pros and cons lists to help make better decisions. Inspired by proco-list.com, this app provides an intuitive interface for organizing thoughts and scoring decisions.

## Features

- **Weighted Pros & Cons Lists**: Add pros and cons with importance weights (1-5 scale)
- **Real-time Scoring**: See instant calculations of total scores to guide decisions
- **Multiple Lists**: Create and manage multiple decision scenarios
- **Clean Interface**: Modern, responsive design built with Tailwind CSS
- **TypeScript Support**: Full type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pros_cons
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## How to Use

1. **Create a List**: Click the "+" button in the sidebar to create a new pros and cons list
2. **Add Items**: Click "Add Item" to add a new pro or con with a weight (1-5 importance scale)
3. **View Scores**: The app automatically calculates and displays:
   - Individual pros and cons scores
   - Overall total score (pros minus cons)
4. **Manage Items**: Edit or delete items using the buttons that appear on hover
5. **Switch Lists**: Click on different lists in the sidebar to switch between them

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Development**: ESLint for code quality

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page component
├── components/         # Reusable React components
│   ├── AddItemForm.tsx
│   ├── CreateListButton.tsx
│   ├── ProsConsItem.tsx
│   └── ProsConsListComponent.tsx
├── lib/               # Utility functions and helpers
├── types/             # TypeScript type definitions
│   └── index.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Local storage persistence for saving lists between sessions
- [ ] Export functionality (PDF, JSON)
- [ ] Sharing capabilities with unique URLs
- [ ] Comparison mode for multiple options
- [ ] Dark mode support
- [ ] Mobile app version# pros_cons
