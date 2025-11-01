# GitLearn

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/issues)

## Interactive Git Learning Platform

GitLearn is a comprehensive, single-file web application designed to teach Git version control systems through interactive examples, visualizations, and practical exercises. The platform covers essential Git commands, advanced workflows, and IDE integration for popular development environments.

![GitLearn Interface](https://placehold.co/800x400/4f46e5/white?text=GitLearn+Interactive+Learning+Platform)

## Key Features

- **Interactive 3D Workflow Visualization** - Real-time visualization of branching, committing, and merging operations
- **Comprehensive Git Command Reference** - Detailed documentation for over 50 Git commands with practical examples
- **IDE Integration Guides** - Step-by-step instructions for Git integration in VS Code and JetBrains IDEs
- **Git Mastery Assessment** - Interactive quiz system to evaluate understanding of Git concepts
- **Adaptive Interface** - Responsive design with dark mode support for optimal viewing experience
- **Self-Contained Architecture** - Entire application delivered through a single HTML file
- **Offline Accessibility** - Downloadable PDF reference guide for offline consultation

## Application Screenshots

### 3D Workflow Visualization
![3D Workflow](https://placehold.co/600x300/1f2937/d1d5db?text=Interactive+3D+Git+Workflow)

Visualize Git operations in real-time with our interactive 3D graph that shows branching, committing, and merging.

### Command Reference
![Command Reference](https://placehold.co/600x300/1f2937/d1d5db?text=Git+Command+Reference)

Access a comprehensive reference of Git commands with detailed explanations and practical examples.

### IDE Integration
![VS Code Integration](https://placehold.co/600x300/1f2937/d1d5db?text=VS+Code+Git+Integration)

Learn how to use Git within popular IDEs like Visual Studio Code and JetBrains products.

## Getting Started

### Prerequisites

GitLearn requires only a modern web browser to run:
- Google Chrome (recommended)
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

No additional software installation or server setup is required.

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```
   Alternatively, download the `index.html` file directly.

2. **Launch the Application**
   Open the `index.html` file in your preferred web browser.

The application will load immediately with no additional configuration required.

## Application Architecture

| Component | Functionality |
|-----------|---------------|
| **Home** | Introduction to Git fundamentals and installation procedures |
| **Workflow** | Interactive 3D visualization of Git branching and merging workflows |
| **Commands** | Curated reference of essential Git commands with examples |
| **All Commands** | Complete reference documentation with detailed explanations |
| **IDEs** | Comprehensive guides for Git integration in popular IDEs |
| **Mastery** | Learning progression path and competency assessment tools |

## Technical Implementation

- **Core Technologies**: HTML5, ECMAScript 6, CSS3
- **Styling Framework**: Tailwind CSS (CDN-delivered)
- **Visualization Engine**: Three.js for 3D graphics rendering
- **UI Components**: Alpine.js for reactive interface elements
- **Deployment Model**: Single-file distribution with no external dependencies

## Contributing

Contributions to enhance GitLearn are welcome. Please follow these guidelines:

### Command Documentation

Git command content is maintained in JavaScript arrays within `index.html`:

1. Open `index.html` in a text editor
2. Navigate to the script section at the bottom of the file
3. Locate the appropriate command array:
   - `const commands = [...]` - Primary command reference
   - `const allGitCommands = [...]` - Extended command documentation

#### Command Object Structure

```javascript
{
    command: 'git [command] [args]',      // Primary command identifier
    category: 'setup',                    // Functional categorization
    description: "Brief description",     // Concise functionality explanation
    syntax: 'git [command] [options]',    // Complete syntax specification
    example: 'git [command] --option-a\n  git [command] --option-b', // Practical examples
    vsCode: "VS Code usage instructions"  // IDE-specific guidance (allGitCommands only)
}
```

#### Command Categories

**Primary Commands (`commands` array):**
- `setup` - Configuration and initialization procedures
- `snapshotting` - Staging and committing operations
- `branching` - Branch management and merging
- `remote` - Remote repository operations
- `undoing` - Change reversal mechanisms
- `history` - Commit history inspection
- `advanced` - Complex Git operations

**Extended Commands (`allGitCommands` array):**
- `setup` - Setup & Configuration
- `project` - Project initialization and cloning
- `snapshotting` - Basic Snapshotting
- `branching` - Branching & Merging
- `sharing` - Repository sharing and updates
- `inspection` - Code inspection and comparison
- `undoing` - Change reversal operations
- `advanced` - Advanced Git functionality
- `collaboration` - Collaborative development tools
- `plumbing` - Low-level Git operations

### Quiz Development

Quiz questions are managed in the `const quizData = [...]` array with the following structure:

```javascript
{
    question: "Question text",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: "Option A"
}
```

After implementing changes, save the file and refresh `index.html` in your browser to verify updates.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete licensing information.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Three.js](https://threejs.org/) - JavaScript 3D library
- [Alpine.js](https://alpinejs.dev/) - Lightweight JavaScript framework