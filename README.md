# GitLearn

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/issues)

**Interactive Git Guide** - Master Git Commands, Workflows, and IDE Integration

GitLearn is a comprehensive, single-file interactive website designed to teach Git commands, common workflows, and integration with popular IDEs like Visual Studio Code and JetBrains.

## 🌟 Features

- **Interactive 3D Workflow Visualization** - See branching, committing, and merging in real-time
- **Comprehensive Git Command Reference** - Over 50 commands with detailed explanations
- **IDE Integration Guides** - Learn how to use Git within VS Code and JetBrains IDEs
- **Git Mastery Quiz** - Test your knowledge with our interactive quiz
- **Dark Mode Support** - Respects your system preference for comfortable viewing
- **Single-File Application** - Entire website (HTML, CSS, JS) contained in one file
- **Responsive Design** - Works beautifully on desktop and mobile devices
- **Downloadable PDF Guide** - Complete Git command reference for offline use

## 🚀 Quick Start

### Running Locally

Since this is a single-file application, there is no build step required:

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   ```
   OR simply download the `index.html` file.

2. **Open in Browser**
   Open the `index.html` file directly in your web browser:
   - Chrome
   - Firefox
   - Safari
   - Edge

That's it! The website will run locally without any additional setup.

## 📚 Website Sections

| Section | Description |
|--------|-------------|
| **Home** | Introduction to Git and installation guide |
| **Workflow** | Interactive 3D visualization of Git workflows |
| **Commands** | Curated reference of essential Git commands |
| **All Commands** | Complete reference with detailed explanations |
| **IDEs** | Integration guides for VS Code and JetBrains IDEs |
| **Mastery** | Learning path and interactive Git quiz |

## 🛠️ Technology Stack

- **HTML5** - Semantic markup and structure
- **Vanilla JavaScript** - Interactive functionality and dynamic content
- **Tailwind CSS** - Modern styling via CDN
- **Three.js** - 3D workflow visualization
- **Alpine.js** - Lightweight reactive UI components

## 🤝 Contributing

We welcome contributions to improve GitLearn! Here's how you can help:

### Adding or Editing Commands

Git command content is stored in JavaScript arrays within `index.html`:

1. Open `index.html` in a text editor
2. Find the script tag at the bottom of the file
3. Locate the appropriate array:
   - `const commands = [...]` - Curated list for the main command reference
   - `const allGitCommands = [...]` - Complete list for the "All Commands" page

#### Command Structure

```javascript
{
    command: 'git [command] [args]',      // Primary command display
    category: 'setup',                    // Categorization
    description: "Brief description",     // Clear explanation of functionality
    syntax: 'git [command] [options]',    // Full syntax
    example: 'git [command] --option-a\n  git [command] --option-b', // Examples
    vsCode: "VS Code usage instructions"  // IDE-specific guidance (allGitCommands only)
}
```

#### Categories

**Main Commands (`commands` array):**
- `setup` - Configuration and initialization
- `snapshotting` - Basic staging and committing
- `branching` - Branch and merge operations
- `remote` - Remote repository management
- `undoing` - Reverting changes
- `history` - Inspection and history
- `advanced` - Complex operations

**All Commands (`allGitCommands` array):**
- `setup` - Setup & Configuration
- `project` - Getting & Creating Projects
- `snapshotting` - Basic Snapshotting
- `branching` - Branching & Merging
- `sharing` - Sharing & Updating Projects
- `inspection` - Inspection & Comparison
- `undoing` - Undoing Things
- `advanced` - Advanced Commands
- `collaboration` - Collaboration / Remote Management
- `plumbing` - Low-Level / Plumbing Commands

### Adding Quiz Questions

Quiz questions are managed in the `const quizData = [...]` array:

```javascript
{
    question: "Question text",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: "Option A"
}
```

After making changes, save the file and reload `index.html` in your browser to see the updates.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Three.js](https://threejs.org/) - JavaScript 3D library
- [Alpine.js](https://alpinejs.dev/) - Lightweight JavaScript framework