# NEED TO DO!
 ## Problem with *line endings* when moving from windows to linux
  `git status` show changes in files although no changes were made.
  The problem occures when moving codebase from Windows to Unix like operating system.
    - read more at [Dealing with line endings](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings#platform-all)
 ## Fix
  Paste these commands before coding:
  #### Windows: 
  
    `git config --global core.autocrlf true`
      
  #### Linux: 
  
    `git config --global core.autocrlf input`
  
