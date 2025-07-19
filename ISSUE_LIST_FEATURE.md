# Issue List Feature

## Overview
The Issue List feature provides a comprehensive view of all GitHub issues and pull requests for the bo-frontend repository, organized in a user-friendly interface.

## Features

### 📋 Issue Display
- **Open Issues**: Currently active issues and pull requests
- **Closed Issues**: Completed/resolved issues and pull requests
- **Issue Details**: Number, title, state, creation/update dates
- **Labels**: Visual badges showing issue categories (enhancement, bug, etc.)
- **Assignees**: Shows who is responsible for each issue

### 🎨 User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Bootstrap Styling**: Clean, modern appearance with cards and badges
- **German Localization**: UI text in German to match the application
- **Expandable Details**: Click to see full issue descriptions
- **External Links**: Direct links to GitHub issues/PRs

### 🧭 Navigation
- **Navbar Integration**: "Issues" link in the main navigation
- **Route**: Accessible at `/issues`
- **Active State**: Navigation highlights when on the issues page

## Technical Implementation

### Components
- `IssueListComponent`: Main component handling display logic
- Location: `src/app/issue-list/`

### Files Created
```
src/app/issue-list/
├── issue-list.component.ts     # Component logic and data
├── issue-list.component.html   # Template with Bootstrap styling
└── issue-list.component.css    # Custom styles and hover effects
```

### Integration Points
- `src/main.ts`: Route configuration
- `src/app/navbar/`: Navigation components
- `src/app/navigationrouter.service.ts`: Route constants

### Data Structure
```typescript
interface Issue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  body?: string;
  created_at: string;
  updated_at: string;
  author_association: string;
  html_url: string;
  labels: Array<{name: string; color: string;}>;
  assignees: Array<{login: string;}>;
  pull_request?: any;
}
```

## Usage

### Accessing the Feature
1. Navigate to the application
2. Click "Issues" in the main navigation bar
3. View open and closed issues in separate sections

### Issue Information Displayed
- **Issue Number**: GitHub issue/PR number (e.g., #16)
- **Title**: Brief description of the issue
- **Type**: Badge indicating "Issue" or "Pull Request"
- **State**: "open" (green) or "closed" (gray) status
- **Labels**: Colored badges for categorization
- **Dates**: Creation and last update timestamps
- **Assignees**: Responsible team members
- **Description**: Expandable full text (when available)

## Current Issues Summary

### Open (4 issues)
1. **#16**: [WIP] What is my issue list? (Pull Request)
2. **#12**: Work/mobile tipp formular (Pull Request)
3. **#11**: Show missing tipp (Enhancement)
4. **#3**: Tipp form: Less game round centric, more 'show the next games to tipp' (Enhancement)

### Recently Closed (6 issues)
1. **#15**: Fixing the research view (Oct 2024)
2. **#14**: Fixing the usability of the research view (Oct 2024)
3. **#13**: Adding some features to create/Update/Delete a community (Sep 2024)
4. **#10**: Work/angular upgrade - Angular 18 upgrade (Aug 2024)
5. **#9**: Work/angular upgrade - Migration to standalone components (Aug 2024)
6. **#8**: Round navigation is broken for EM oder WM championships (May 2024)

## Future Enhancements
- **GitHub API Integration**: Replace static data with live GitHub API calls
- **Filtering**: Add filters by label, assignee, or date
- **Sorting**: Allow sorting by different criteria
- **Search**: Add search functionality for finding specific issues
- **Pagination**: Handle large numbers of issues efficiently
- **Real-time Updates**: Auto-refresh for new issues/updates