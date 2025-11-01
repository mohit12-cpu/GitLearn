// Git Master Terminal Functionality

// DOM elements will be set after DOM loads
let terminalInput, terminalOutput;

// Virtual repository state
let repoState = {
    initialized: false,
    files: {},
    staged: {},
    commits: [],
    branches: ['main'],
    currentBranch: 'main',
    remote: null,
    history: []
};

// Mission states
let currentMission = null;
let missionProgress = 0;

// Command history
let commandHistory = [];
let historyIndex = -1;

// Available commands
const terminalCommands = {
    help: {
        description: "Show available commands",
        usage: "help [command]",
        execute: function(args) {
            if (args[0]) {
                const cmd = args[0];
                if (terminalCommands[cmd]) {
                    printOutput(`$ ${cmd} - ${terminalCommands[cmd].description}`);
                    printOutput(`  Usage: ${terminalCommands[cmd].usage}`);
                } else {
                    printOutput(`Command '${cmd}' not found. Type 'help' for available commands.`);
                }
            } else {
                printOutput("Available commands:");
                Object.keys(terminalCommands).forEach(cmd => {
                    printOutput(`  ${cmd} - ${terminalCommands[cmd].description}`);
                });
                printOutput("Type 'help [command]' for more information on a specific command.");
            }
        }
    },
    // Setup & Config
    "git config": {
        description: "Get and set repository or global options",
        usage: "git config [--global] <key> [<value>]",
        execute: function(args) {
            if (args.length === 0) {
                printOutput("usage: git config [<options>] [--type=<type>] [--fixed-value] [--null] [<key> [<value>]]");
                return;
            }
            
            if (args.includes("--global")) {
                const keyIndex = args.indexOf("--global") + 1;
                const key = args[keyIndex];
                const value = args[keyIndex + 1];
                if (key && value) {
                    printOutput(`Global config ${key} set to ${value}`);
                } else if (key) {
                    printOutput(`Global config ${key} = some_value`);
                }
            } else {
                const key = args[0];
                const value = args[1];
                if (key && value) {
                    printOutput(`Config ${key} set to ${value}`);
                } else if (key) {
                    printOutput(`Config ${key} = some_value`);
                }
            }
            addToHistory("git config " + args.join(' '));
        }
    },
    "git init": {
        description: "Create an empty Git repository or reinitialize an existing one",
        usage: "git init [<directory>]",
        execute: function(args) {
            if (repoState.initialized) {
                printOutput("Reinitialized existing Git repository.");
            } else {
                repoState.initialized = true;
                printOutput("Initialized empty Git repository.");
            }
            addToHistory("git init " + args.join(' '));
        }
    },
    "git clone": {
        description: "Clone a repository into a new directory",
        usage: "git clone <repository> [<directory>]",
        execute: function(args) {
            if (args.length === 0) {
                printOutput("fatal: You must specify a repository to clone.");
                return;
            }
            
            const repo = args[0];
            const dir = args[1] || repo.split('/').pop().replace('.git', '');
            printOutput(`Cloning into '${dir}'...`);
            printOutput("remote: Counting objects: 100% (42/42), done.");
            printOutput("remote: Compressing objects: 100% (28/28), done.");
            printOutput("Receiving objects: 100% (42/42), done.");
            printOutput("Resolving deltas: 100% (15/15), done.");
            repoState.initialized = true;
            addToHistory("git clone " + args.join(' '));
        }
    },
    
    // Snapshotting
    "git add": {
        description: "Add file contents to the index",
        usage: "git add <file>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("Nothing specified, nothing added.");
                printOutput("Maybe you wanted to say 'git add .'?");
                return;
            }
            
            const file = args[0];
            if (file === '.') {
                // Add all files
                Object.keys(repoState.files).forEach(f => {
                    repoState.staged[f] = repoState.files[f];
                    delete repoState.files[f];
                });
                printOutput("All files added to staging area.");
            } else {
                if (repoState.files[file]) {
                    repoState.staged[file] = repoState.files[file];
                    delete repoState.files[file];
                    printOutput("Added " + file + " to staging area.");
                } else if (repoState.staged[file]) {
                    printOutput("File " + file + " is already staged.");
                } else {
                    printOutput("File " + file + " not found in working directory.");
                }
            }
            addToHistory("git add " + args.join(' '));
        }
    },
    "git status": {
        description: "Show the working tree status",
        usage: "git status [<options>]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            printOutput("On branch " + repoState.currentBranch);
            if (Object.keys(repoState.staged).length > 0) {
                printOutput("Changes to be committed:");
                Object.keys(repoState.staged).forEach(file => {
                    printOutput("  (use \"git reset HEAD <file>...\" to unstage)");
                    printOutput("        " + file);
                });
            }
            if (Object.keys(repoState.files).length > 0) {
                printOutput("Changes not staged for commit:");
                Object.keys(repoState.files).forEach(file => {
                    printOutput("  (use \"git add <file>...\" to update what will be committed)");
                    printOutput("        " + file);
                });
            }
            if (Object.keys(repoState.staged).length === 0 && Object.keys(repoState.files).length === 0) {
                printOutput("nothing to commit, working tree clean");
            }
            addToHistory("git status " + args.join(' '));
        }
    },
    "git diff": {
        description: "Show changes between commits, commit and working tree, etc",
        usage: "git diff [<options>] [<commit>] [--] [<path>...]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (Object.keys(repoState.files).length > 0) {
                printOutput("diff --git a/file.txt b/file.txt");
                printOutput("index 1234567..89abcde 100644");
                printOutput("--- a/file.txt");
                printOutput("+++ b/file.txt");
                printOutput("@@ -1 +1,2 @@");
                printOutput(" Hello World");
                printOutput("+This is a new line");
            } else {
                printOutput("No changes in working directory");
            }
            addToHistory("git diff " + args.join(' '));
        }
    },
    "git commit": {
        description: "Record changes to the repository",
        usage: "git commit [-m <msg>]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (Object.keys(repoState.staged).length === 0) {
                printOutput("On branch " + repoState.currentBranch);
                printOutput("nothing to commit, working tree clean");
                return;
            }
            
            let message = "";
            if (args[0] === '-m' && args[1]) {
                message = args[1].replace(/"/g, '');
            } else {
                printOutput("Please provide a commit message with -m \"message\"");
                return;
            }
            
            const commit = {
                id: Math.random().toString(36).substring(2, 9),
                message: message,
                files: Object.keys(repoState.staged),
                branch: repoState.currentBranch,
                timestamp: new Date()
            };
            
            repoState.commits.push(commit);
            repoState.staged = {};
            printOutput("[master (root-commit) " + commit.id + "] " + message);
            printOutput(" 1 file changed, 1 insertion(+)");
            printOutput(" create mode 100644 file.txt");
            addToHistory("git commit -m \"" + message + "\"");
            
            // Check mission progress
            if (currentMission === 1 && missionProgress === 1) {
                missionProgress = 2;
                printOutput("✅ Mission 1 completed! You've successfully initialized a repository and made your first commit.");
                currentMission = null;
            }
        }
    },
    
    // Branching & Merging
    "git branch": {
        description: "List, create, or delete branches",
        usage: "git branch [--list | -a | -r] [<branchname>]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                // List branches
                repoState.branches.forEach(branch => {
                    if (branch === repoState.currentBranch) {
                        printOutput("* " + branch);
                    } else {
                        printOutput("  " + branch);
                    }
                });
            } else {
                const branchName = args[0];
                if (repoState.branches.includes(branchName)) {
                    printOutput("fatal: A branch named '" + branchName + "' already exists.");
                } else {
                    repoState.branches.push(branchName);
                    printOutput("Created branch " + branchName);
                    
                    // Check mission progress
                    if (currentMission === 2 && missionProgress === 0) {
                        missionProgress = 1;
                        printOutput("✅ Step 1 completed! You've created a new branch.");
                    }
                }
            }
            addToHistory("git branch " + args.join(' '));
        }
    },
    "git checkout": {
        description: "Switch branches or restore working tree files",
        usage: "git checkout <branch>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("usage: git checkout <branch>");
                return;
            }
            
            const branchName = args[0];
            if (repoState.branches.includes(branchName)) {
                repoState.currentBranch = branchName;
                printOutput("Switched to branch '" + branchName + "'");
                
                // Check mission progress
                if (currentMission === 2 && missionProgress === 2) {
                    missionProgress = 3;
                    printOutput("✅ Step 3 completed! You've switched back to the main branch.");
                }
            } else {
                printOutput("error: pathspec '" + branchName + "' did not match any file(s) known to git");
            }
            addToHistory("git checkout " + branchName);
        }
    },
    "git merge": {
        description: "Join two or more development histories together",
        usage: "git merge <branch>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("usage: git merge <branch>");
                return;
            }
            
            const branchName = args[0];
            if (repoState.branches.includes(branchName)) {
                if (branchName === repoState.currentBranch) {
                    printOutput("Already up to date.");
                } else {
                    printOutput("Updating abc1234..def5678");
                    printOutput("Fast-forward");
                    printOutput(" file.txt | 1 +");
                    printOutput(" 1 file changed, 1 insertion(+)");
                    
                    // Check mission progress
                    if (currentMission === 2 && missionProgress === 3) {
                        missionProgress = 4;
                        printOutput("✅ Mission 2 completed! You've successfully merged a branch.");
                        currentMission = null;
                    }
                }
            } else {
                printOutput("fatal: Couldn't find remote ref " + branchName);
            }
            addToHistory("git merge " + branchName);
        }
    },
    
    // Remote
    "git remote": {
        description: "Manage set of tracked repositories",
        usage: "git remote [-v | --verbose] [-q | --quiet] [--cached] [--[no-]tags] [--mirror=<fetch|push>] [-f | --fetch] [--prune] [-n | --no-tags] [--refmap=<refspec>] [--force] [--[no-]progress] [--verbose] [<command> [<name> [<url>]]]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                if (repoState.remote) {
                    printOutput(repoState.remote.name);
                }
            } else if (args[0] === "-v") {
                if (repoState.remote) {
                    printOutput(repoState.remote.name + " " + repoState.remote.url + " (fetch)");
                    printOutput(repoState.remote.name + " " + repoState.remote.url + " (push)");
                }
            } else if (args[0] === "add" && args[1] && args[2]) {
                repoState.remote = {
                    name: args[1],
                    url: args[2]
                };
                printOutput("Added remote " + args[1]);
            }
            addToHistory("git remote " + args.join(' '));
        }
    },
    "git fetch": {
        description: "Download objects and refs from another repository",
        usage: "git fetch [<options>] [<repository> [<refspec>...]]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.remote) {
                printOutput("remote: Counting objects: 100% (10/10), done.");
                printOutput("remote: Compressing objects: 100% (6/6), done.");
                printOutput("Unpacking objects: 100% (10/10), done.");
                printOutput("From " + repoState.remote.url);
                printOutput(" * [new branch]      feature-branch -> origin/feature-branch");
            } else {
                printOutput("fatal: No remote repository specified.");
            }
            addToHistory("git fetch " + args.join(' '));
        }
    },
    "git pull": {
        description: "Fetch from and integrate with another repository or a local branch",
        usage: "git pull [<options>] [<repository> [<refspec>...]]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.remote) {
                printOutput("remote: Counting objects: 100% (10/10), done.");
                printOutput("remote: Compressing objects: 100% (6/6), done.");
                printOutput("Unpacking objects: 100% (10/10), done.");
                printOutput("From " + repoState.remote.url);
                printOutput(" * branch            main       -> FETCH_HEAD");
                printOutput("Updating abc1234..def5678");
                printOutput("Fast-forward");
                printOutput(" file.txt | 1 +");
                printOutput(" 1 file changed, 1 insertion(+)");
            } else {
                printOutput("fatal: No remote repository specified.");
            }
            addToHistory("git pull " + args.join(' '));
        }
    },
    "git push": {
        description: "Update remote refs along with associated objects",
        usage: "git push [<options>] [<repository> [<refspec>...]]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.remote) {
                printOutput("Counting objects: 100% (10/10), done.");
                printOutput("Delta compression using up to 4 threads.");
                printOutput("Compressing objects: 100% (6/6), done.");
                printOutput("Writing objects: 100% (10/10), 800 bytes | 800.00 KiB/s, done.");
                printOutput("Total 10 (delta 2), reused 0 (delta 0)");
                printOutput("To " + repoState.remote.url);
                printOutput("   abc1234..def5678  main -> main");
            } else {
                printOutput("fatal: No remote repository specified.");
            }
            addToHistory("git push " + args.join(' '));
        }
    },
    
    // History & Inspection
    "git log": {
        description: "Show commit logs",
        usage: "git log",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.commits.length === 0) {
                printOutput("fatal: your current branch 'master' does not have any commits yet");
                return;
            }
            
            repoState.commits.slice().reverse().forEach(commit => {
                printOutput("commit " + commit.id);
                printOutput("Author: GitLearn User <user@gitlearn.com>");
                printOutput("Date:   " + commit.timestamp.toString());
                printOutput("");
                printOutput("    " + commit.message);
                printOutput("");
            });
            addToHistory("git log " + args.join(' '));
        }
    },
    "git show": {
        description: "Show various types of objects",
        usage: "git show [<options>] [<object>...]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.commits.length > 0) {
                const commit = repoState.commits[repoState.commits.length - 1];
                printOutput("commit " + commit.id);
                printOutput("Author: GitLearn User <user@gitlearn.com>");
                printOutput("Date:   " + commit.timestamp.toString());
                printOutput("");
                printOutput("    " + commit.message);
                printOutput("");
                printOutput("diff --git a/file.txt b/file.txt");
                printOutput("index 1234567..89abcde 100644");
                printOutput("--- a/file.txt");
                printOutput("+++ b/file.txt");
                printOutput("@@ -1 +1,2 @@");
                printOutput(" Hello World");
                printOutput("+This is a new line");
            } else {
                printOutput("fatal: bad revision 'HEAD'");
            }
            addToHistory("git show " + args.join(' '));
        }
    },
    
    // Undoing Changes
    "git reset": {
        description: "Reset current HEAD to the specified state",
        usage: "git reset [--soft | --mixed | --hard] [<commit>]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.includes("--hard")) {
                repoState.staged = {};
                repoState.files = {};
                printOutput("HEAD is now at abc1234 Previous commit");
            } else if (args.length > 0) {
                printOutput("Unstaged changes after reset:");
                printOutput("M	file.txt");
            } else {
                printOutput("usage: git reset [<mode>] [<commit>]");
            }
            addToHistory("git reset " + args.join(' '));
        }
    },
    "git revert": {
        description: "Revert some existing commits",
        usage: "git revert <commit>...",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("fatal: No commits to revert");
                return;
            }
            
            printOutput("[master abc1234] Revert \"" + args[0] + "\"");
            printOutput(" 1 file changed, 1 deletion(-)");
            addToHistory("git revert " + args.join(' '));
        }
    },
    
    // Advanced
    "git stash": {
        description: "Stash the changes in a dirty working directory away",
        usage: "git stash [<subcommand>] [<options>] [--] [<pathspec>...]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0 || args[0] === "save") {
                if (Object.keys(repoState.files).length > 0 || Object.keys(repoState.staged).length > 0) {
                    printOutput("Saved working directory and index state WIP on master: abc1234 Previous commit");
                    repoState.files = {};
                    repoState.staged = {};
                } else {
                    printOutput("No local changes to save");
                }
            } else if (args[0] === "pop") {
                printOutput("On branch master");
                printOutput("Changes not staged for commit:");
                printOutput("  (use \"git add <file>...\" to update what will be committed)");
                printOutput("  (use \"git restore <file>...\" to discard changes in working directory)");
                printOutput("	modified:   file.txt");
                printOutput("");
                printOutput("no changes added to commit (use \"git add\" and/or \"git commit -a\")");
            } else if (args[0] === "list") {
                printOutput("stash@{0}: WIP on master: abc1234 Previous commit");
            }
            addToHistory("git stash " + args.join(' '));
        }
    },
    "git rebase": {
        description: "Reapply commits on top of another base tip",
        usage: "git rebase [-i] [<upstream> [<branch>]]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("usage: git rebase [<options>] [--exec <cmd>] [--onto <newbase> [<upstream>]] [<upstream>] [<branch>]");
                return;
            }
            
            printOutput("First, rewinding head to replay your work on top of it...");
            printOutput("Applying: First commit");
            printOutput("Applying: Second commit");
            printOutput("Applying: Third commit");
            addToHistory("git rebase " + args.join(' '));
        }
    },
    
    // Existing commands (keeping for backward compatibility)
    init: {
        description: "Initialize a new Git repository (alias for git init)",
        usage: "init",
        execute: function() {
            if (repoState.initialized) {
                printOutput("Reinitialized existing Git repository.");
            } else {
                repoState.initialized = true;
                printOutput("Initialized empty Git repository.");
            }
            addToHistory("init");
        }
    },
    status: {
        description: "Show the working tree status (alias for git status)",
        usage: "status",
        execute: function() {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            printOutput("On branch " + repoState.currentBranch);
            if (Object.keys(repoState.staged).length > 0) {
                printOutput("Changes to be committed:");
                Object.keys(repoState.staged).forEach(file => {
                    printOutput("  (use \"git reset HEAD <file>...\" to unstage)");
                    printOutput("        " + file);
                });
            }
            if (Object.keys(repoState.files).length > 0) {
                printOutput("Changes not staged for commit:");
                Object.keys(repoState.files).forEach(file => {
                    printOutput("  (use \"git add <file>...\" to update what will be committed)");
                    printOutput("        " + file);
                });
            }
            if (Object.keys(repoState.staged).length === 0 && Object.keys(repoState.files).length === 0) {
                printOutput("nothing to commit, working tree clean");
            }
            addToHistory("status");
        }
    },
    add: {
        description: "Add file contents to the index (alias for git add)",
        usage: "add <file>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("Nothing specified, nothing added.");
                printOutput("Maybe you wanted to say 'git add .'?");
                return;
            }
            
            const file = args[0];
            if (file === '.') {
                // Add all files
                Object.keys(repoState.files).forEach(f => {
                    repoState.staged[f] = repoState.files[f];
                    delete repoState.files[f];
                });
                printOutput("All files added to staging area.");
            } else {
                if (repoState.files[file]) {
                    repoState.staged[file] = repoState.files[file];
                    delete repoState.files[file];
                    printOutput("Added " + file + " to staging area.");
                } else if (repoState.staged[file]) {
                    printOutput("File " + file + " is already staged.");
                } else {
                    printOutput("File " + file + " not found in working directory.");
                }
            }
            addToHistory("add " + args.join(' '));
        }
    },
    commit: {
        description: "Record changes to the repository (alias for git commit)",
        usage: "commit -m \"message\"",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (Object.keys(repoState.staged).length === 0) {
                printOutput("On branch " + repoState.currentBranch);
                printOutput("nothing to commit, working tree clean");
                return;
            }
            
            let message = "";
            if (args[0] === '-m' && args[1]) {
                message = args[1].replace(/"/g, '');
            } else {
                printOutput("Please provide a commit message with -m \"message\"");
                return;
            }
            
            const commit = {
                id: Math.random().toString(36).substring(2, 9),
                message: message,
                files: Object.keys(repoState.staged),
                branch: repoState.currentBranch,
                timestamp: new Date()
            };
            
            repoState.commits.push(commit);
            repoState.staged = {};
            printOutput("[master (root-commit) " + commit.id + "] " + message);
            printOutput(" 1 file changed, 1 insertion(+)");
            printOutput(" create mode 100644 file.txt");
            addToHistory("commit -m \"" + message + "\"");
            
            // Check mission progress
            if (currentMission === 1 && missionProgress === 1) {
                missionProgress = 2;
                printOutput("✅ Mission 1 completed! You've successfully initialized a repository and made your first commit.");
                currentMission = null;
            }
        }
    },
    log: {
        description: "Show commit logs (alias for git log)",
        usage: "log",
        execute: function() {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (repoState.commits.length === 0) {
                printOutput("fatal: your current branch 'master' does not have any commits yet");
                return;
            }
            
            repoState.commits.slice().reverse().forEach(commit => {
                printOutput("commit " + commit.id);
                printOutput("Author: GitLearn User <user@gitlearn.com>");
                printOutput("Date:   " + commit.timestamp.toString());
                printOutput("");
                printOutput("    " + commit.message);
                printOutput("");
            });
            addToHistory("log");
        }
    },
    branch: {
        description: "List, create, or delete branches (alias for git branch)",
        usage: "branch [branchname]",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                // List branches
                repoState.branches.forEach(branch => {
                    if (branch === repoState.currentBranch) {
                        printOutput("* " + branch);
                    } else {
                        printOutput("  " + branch);
                    }
                });
            } else {
                const branchName = args[0];
                if (repoState.branches.includes(branchName)) {
                    printOutput("fatal: A branch named '" + branchName + "' already exists.");
                } else {
                    repoState.branches.push(branchName);
                    printOutput("Created branch " + branchName);
                    
                    // Check mission progress
                    if (currentMission === 2 && missionProgress === 0) {
                        missionProgress = 1;
                        printOutput("✅ Step 1 completed! You've created a new branch.");
                    }
                }
            }
            addToHistory("branch " + args.join(' '));
        }
    },
    checkout: {
        description: "Switch branches or restore working tree files (alias for git checkout)",
        usage: "checkout <branch>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("usage: checkout <branch>");
                return;
            }
            
            const branchName = args[0];
            if (repoState.branches.includes(branchName)) {
                repoState.currentBranch = branchName;
                printOutput("Switched to branch '" + branchName + "'");
                
                // Check mission progress
                if (currentMission === 2 && missionProgress === 2) {
                    missionProgress = 3;
                    printOutput("✅ Step 3 completed! You've switched back to the main branch.");
                }
            } else {
                printOutput("error: pathspec '" + branchName + "' did not match any file(s) known to git");
            }
            addToHistory("checkout " + branchName);
        }
    },
    merge: {
        description: "Join two or more development histories together (alias for git merge)",
        usage: "merge <branch>",
        execute: function(args) {
            if (!repoState.initialized) {
                printOutput("fatal: not a git repository (or any of the parent directories): .git");
                return;
            }
            
            if (args.length === 0) {
                printOutput("usage: merge <branch>");
                return;
            }
            
            const branchName = args[0];
            if (repoState.branches.includes(branchName)) {
                if (branchName === repoState.currentBranch) {
                    printOutput("Already up to date.");
                } else {
                    printOutput("Updating abc1234..def5678");
                    printOutput("Fast-forward");
                    printOutput(" file.txt | 1 +");
                    printOutput(" 1 file changed, 1 insertion(+)");
                    
                    // Check mission progress
                    if (currentMission === 2 && missionProgress === 3) {
                        missionProgress = 4;
                        printOutput("✅ Mission 2 completed! You've successfully merged a branch.");
                        currentMission = null;
                    }
                }
            } else {
                printOutput("fatal: Couldn't find remote ref " + branchName);
            }
            addToHistory("merge " + branchName);
        }
    },
    mission: {
        description: "Start a learning mission",
        usage: "mission [1|2|3]",
        execute: function(args) {
            if (args[0]) {
                const missionNum = parseInt(args[0]);
                if (missionNum >= 1 && missionNum <= 3) {
                    startMission(missionNum);
                } else {
                    printOutput("Invalid mission number. Available missions: 1, 2, 3");
                }
            } else {
                printOutput("Available missions:");
                printOutput("  1 - Initialize Repository");
                printOutput("  2 - Branching");
                printOutput("  3 - Collaboration (coming soon)");
            }
        }
    },
    clear: {
        description: "Clear the terminal screen",
        usage: "clear",
        execute: function() {
            terminalOutput.innerHTML = '';
        }
    }
};

// Print output to terminal
function printOutput(text) {
    const lines = text.split('\n');
    lines.forEach(line => {
        const div = document.createElement('div');
        div.className = 'mb-1';
        div.textContent = line;
        terminalOutput.appendChild(div);
    });
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Add command to history
function addToHistory(command) {
    commandHistory.push(command);
    historyIndex = commandHistory.length;
}

// Start a mission
function startMission(missionNum) {
    currentMission = missionNum;
    missionProgress = 0;
    
    switch (missionNum) {
        case 1:
            printOutput("🚀 Mission 1: Initialize Repository");
            printOutput("Your task: Create a new Git repository and make your first commit");
            printOutput("");
            printOutput("Steps:");
            printOutput("1. Initialize a new repository with 'git init'");
            printOutput("2. Create a file (simulated)");
            printOutput("3. Add the file to staging with 'git add .'");
            printOutput("4. Commit the file with 'git commit -m \"Initial commit\"'");
            printOutput("");
            printOutput("💡 Tip: Type 'help' to see available commands");
            
            // Simulate creating a file
            repoState.files['README.md'] = 'Initial content';
            printOutput("📝 Created README.md file");
            break;
        case 2:
            printOutput("🚀 Mission 2: Branching");
            printOutput("Your task: Create and merge a feature branch");
            printOutput("");
            printOutput("Steps:");
            printOutput("1. Create a new branch with 'git branch feature-login'");
            printOutput("2. Switch to the new branch with 'git checkout feature-login'");
            printOutput("3. Make changes and commit them");
            printOutput("4. Switch back to main branch with 'git checkout main'");
            printOutput("5. Merge the feature branch with 'git merge feature-login'");
            printOutput("");
            printOutput("💡 Tip: Type 'help' to see available commands");
            break;
        case 3:
            printOutput("🚀 Mission 3: Collaboration");
            printOutput("This mission is coming soon!");
            currentMission = null;
            break;
    }
}

// Process terminal input
function processCommand(input) {
    if (!input.trim()) return;
    
    printOutput("$ " + input);
    
    const parts = input.trim().split(' ');
    let command = parts[0];
    let args = parts.slice(1);
    
    // Check for multi-word commands like "git init"
    if (parts.length >= 2) {
        const twoWordCommand = parts[0] + ' ' + parts[1];
        if (terminalCommands[twoWordCommand]) {
            command = twoWordCommand;
            args = parts.slice(2);
        }
    }
    
    if (terminalCommands[command]) {
        terminalCommands[command].execute(args);
    } else {
        printOutput("Command '" + command + "' not found. Type 'help' for available commands.");
    }
}

// Event listeners for terminal
function setupTerminalEventListeners() {
    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                processCommand(this.value);
                this.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    if (historyIndex > 0) {
                        historyIndex--;
                    }
                    this.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = commandHistory.length;
                    this.value = '';
                }
            }
        });
    }
}

// Mission button event listeners
function setupMissionButtons() {
    document.querySelectorAll('.mission-btn').forEach(button => {
        button.addEventListener('click', function() {
            const mission = parseInt(this.getAttribute('data-mission'));
            startMission(mission);
            
            // Show the terminal section
            showPage('terminal');
        });
    });
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    terminalInput = document.getElementById('terminal-input');
    terminalOutput = document.getElementById('terminal-output');
    
    // Set up event listeners
    setupTerminalEventListeners();
    setupMissionButtons();
    
    // Focus terminal when section is shown
    const terminalSection = document.getElementById('terminal');
    if (terminalSection) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (!mutation.target.classList.contains('hidden')) {
                    if (terminalInput) terminalInput.focus();
                }
            });
        });
        observer.observe(terminalSection, { attributes: true, attributeFilter: ['class'] });
    }
});