# GitLearn

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/git-learn/git-learn.svg)](https://github.com/git-learn/git-learn/issues)

## Interactive Git Learning Platform

GitLearn is a comprehensive, single-file web application designed to teach Git version control systems through interactive examples, visualisations, and practical exercises. The platform covers essential Git commands, advanced workflows, and IDE integration for popular development environments.

![GitLearn Interface](https://placehold.co/800x400/4f46e5/white?text=GitLearn+Interactive+Learning+Platform)

## Key Features

- **Interactive 3D Workflow Visualisation** - Real-time visualisation of branching, committing, and merging operations
- **Comprehensive Git Command Reference** - Detailed documentation for over 50 Git commands with practical examples
- **IDE Integration Guides** - Step-by-step instructions for Git integration in VS Code and JetBrains IDEs
- **Git Mastery Assessment** - Interactive quiz system to evaluate understanding of Git concepts
- **Git Master Terminal** - Interactive in-browser terminal to practice Git commands
- **Adaptive Interface** - Responsive design with dark mode support for optimal viewing experience
- **Self-Contained Architecture** - Entire application delivered through a single HTML file
- **Offline Accessibility** - Downloadable PDF reference guide for offline consultation

## Application Screenshots

### 3D Workflow
![3D Workflow](image/3D%20Workflow%20Visualization.png)

Visualise Git operations in real-time with our interactive 3D graph that shows branching, committing, and merging.

### Command Reference
![Command Reference](image/Command%20Reference.png)

Access a comprehensive reference of Git commands with detailed explanations and practical examples.

### IDE Integration
![VS Code Integration](https://placehold.co/600x300/1f2937/d1d5db?text=VS+Code+Git+Integration)

Learn how to use Git within popular IDEs like Visual Studio Code and JetBrains products.

### Git Terminal
![Git Terminal](image/Git%20Master%20Terminal.png)

Practice Git commands in an interactive terminal environment with simulated repository operations.

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
   git clone https://github.com/mohit12-cpu/GitLearn.git
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
| **Git Terminal** | Interactive terminal for practicing Git commands |

## Git Master Terminal

The Git Master Terminal is an interactive in-browser terminal that simulates real Git operations. Users can practice Git commands in a safe environment without affecting their actual repositories.

### Features

- **Realistic Terminal Interface** - Dark theme with monospace font for an authentic developer experience
- **Command Simulation** - All key Git commands with realistic responses
- **Learning Missions** - Guided tutorials for common Git workflows
- **Command History** - Navigate through previous commands with up/down arrow keys
- **Virtual Repository** - Simulated repository state management

### Supported Commands

- `git init` - Initialise a new repository
- `git status` - Show working tree status
- `git add` - Add file contents to the index
- `git commit` - Record changes to the repository
- `git log` - Show commit logs
- `git branch` - List, create, or delete branches
- `git checkout` - Switch branches or restore working tree files
- `git merge` - Join two or more development histories
- `help` - Show available commands
- `mission` - Start a learning mission
- `clear` - Clear the terminal screen

### Learning Missions

1. **Initialise Repository** - Create a new Git repository and make your first commit
2. **Branching** - Create and merge a feature branch
3. **Collaboration** - Simulate working with remote repositories (coming soon)

## Technical Implementation

- **Core Technologies**: HTML5, ECMAScript 6, CSS3
- **Styling Framework**: Tailwind CSS (CDN-delivered)
- **Visualization Engine**: Three.js for 3D graphics rendering
- **UI Components**: Alpine.js for reactive interface elements
- **Deployment Model**: Single-file distribution with no external dependencies

## Contributing

I want you to know that contributions to enhance GitLearn are welcome. Please follow these guidelines:

### Command Documentation

Git command content is maintained in JavaScript arrays within `index.html`:

1. Open `index.html` in a text editor
2. Navigate to the script section at the bottom of the file
3. Locate the appropriate command array:
   - `const commands = [...]` - Primary command reference
   - `const allGitCommands = [...]` - Extended command documentation

#### Command Object Structure

```JavaScript
{
    command: 'git [command] [args]',      // Primary command identifier
    category: 'setup',                    // Functional categorisation
    description: "Brief description",     // Concise functionality explanation
    syntax: 'git [command] [options]',    // Complete syntax specification
    example: 'git [command] --option-a\n  git [command] --option-b', // Practical examples
    vsCode: "VS Code usage instructions"  // IDE-specific guidance (allGitCommands only)
}
```

#### Command Categories

**Primary Commands (`commands` array):**
- `setup` - Configuration and initialisation procedures
- `snapshotting` - Staging and committing operations
- `branching` - Branch management and merging
- `remote` - Remote repository operations
- `undoing` - Change reversal mechanisms
- `history` - Commit history inspection
- `advanced` - Complex Git operations

**Extended Commands (`allGitCommands` array):**
- `setup` - Setup & Configuration
- `project` - Project initialisation and cloning
- `snapshotting` - Basic Snapshotting
- `branching` - Branching & Merging
- `sharing` - Repository sharing and updates
- `inspection` - Code inspection and comparison
- `undoing` - Change reversal operations
- `advanced` - Advanced Git functionality
- `collaboration` - Collaborative development tools
- `plumbing` - Low-level Git operations

### Adding Quiz Questions

Quiz questions are managed in the `const quizData = [...]` array with the following structure:

```JavaScript
{
    question: "Question text",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: "Option A"
}
```

### Extending the Git Master Terminal

To add new commands to the Git Master Terminal:

1. Locate the `commands` object in the terminal logic section
2. Add a new command object with the following structure:

```JavaScript
commandName: {
    description: "Brief description of the command",
    usage: "commandName [options]",
    execute: function(args) {
        // Implementation of the command logic
        // Use printOutput() to display results
        // Use addToHistory() to add commands to history
    }
}
```

After implementing changes, save the file and refresh `index.html` in your browser to verify updates.

## License

This project is licensed under the MIT License. Please take a look at the [LICENSE](LICENSE) file for complete licensing information.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Three.js](https://threejs.org/) - JavaScript 3D library
- [Alpine.js](https://alpinejs.dev/) - Lightweight JavaScript framework
