import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { NavigationRouterService } from '../navigationrouter.service';

interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  body?: string;
  created_at: string;
  updated_at: string;
  author_association: string;
  html_url: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  assignees: Array<{
    login: string;
  }>;
  pull_request?: any;
}

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe]
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private navigationRouterService: NavigationRouterService) {}

  ngOnInit(): void {
    this.navigationRouterService.activate(NavigationRouterService.ROUTE_ISSUES);
    this.loadIssues();
  }

  private loadIssues(): void {
    // Static issue data based on GitHub API response
    this.issues = [
      {
        id: 3200206653,
        number: 16,
        title: "[WIP] What is my issue list?",
        state: "open",
        body: "Thanks for asking me to work on this. I will get started on it and keep this PR's description up to date as I form a plan and make progress.\n\nOriginal description:\n\n> What is my issue list?",
        created_at: "2025-07-03T18:03:21Z",
        updated_at: "2025-07-03T18:03:21Z",
        author_association: "NONE",
        html_url: "https://github.com/gluehloch/bo-frontend/pull/16",
        labels: [],
        assignees: [
          { login: "gluehloch" },
          { login: "Copilot" }
        ],
        pull_request: {}
      },
      {
        id: 2511459100,
        number: 12,
        title: "Work/mobile tipp formular",
        state: "open",
        body: "",
        created_at: "2024-09-07T04:23:57Z",
        updated_at: "2025-02-21T19:34:00Z",
        author_association: "OWNER",
        html_url: "https://github.com/gluehloch/bo-frontend/pull/12",
        labels: [],
        assignees: [],
        pull_request: {}
      },
      {
        id: 2504314377,
        number: 11,
        title: "Show missing tipp",
        state: "open",
        body: "Das Tippformular umfasst mehrere Spiele mit verschiedenen Zeitpunkten. Falls der Tipper das früheste Spiel verpasst, kann er immer noch für die restlichen Spiele einen Tipp abgeben. Für das verpasste Spiel wird als Tipp ein 0:0 angezeigt. Falls das Spiel ebenfalls 0:0 ausgeht, sieht das in der Anzeige etwas merkwürdig aus. Besser wäre es, hier einen Hinweistext einzublenden: Tipp nicht abgegeben,",
        created_at: "2024-09-04T05:03:08Z",
        updated_at: "2024-09-04T05:03:08Z",
        author_association: "OWNER",
        html_url: "https://github.com/gluehloch/bo-frontend/issues/11",
        labels: [
          { name: "enhancement", color: "a2eeef" }
        ],
        assignees: [
          { login: "gluehloch" }
        ]
      },
      {
        id: 2092071158,
        number: 3,
        title: "Tipp form: Less game round centric, more 'show the next games to tipp'",
        state: "open",
        body: "Give the users some options: The games for next 14 days, 7 days, 1 day",
        created_at: "2024-01-20T14:19:09Z",
        updated_at: "2024-01-20T14:22:00Z",
        author_association: "OWNER",
        html_url: "https://github.com/gluehloch/bo-frontend/issues/3",
        labels: [
          { name: "enhancement", color: "a2eeef" }
        ],
        assignees: [
          { login: "gluehloch" }
        ]
      },
      {
        id: 2567723836,
        number: 15,
        title: "Fixing the research view",
        state: "closed",
        body: "",
        created_at: "2024-10-05T07:56:54Z",
        updated_at: "2024-10-05T07:57:11Z",
        author_association: "OWNER",
        html_url: "https://github.com/gluehloch/bo-frontend/pull/15",
        labels: [],
        assignees: [],
        pull_request: {}
      },
      {
        id: 2563932560,
        number: 14,
        title: "Fixing the usability of the research view",
        state: "closed",
        body: "",
        created_at: "2024-10-03T12:29:24Z",
        updated_at: "2024-10-03T12:30:08Z",
        author_association: "OWNER",
        html_url: "https://github.com/gluehloch/bo-frontend/pull/14",
        labels: [],
        assignees: [],
        pull_request: {}
      }
    ];
  }

  getIssuesByState(state: string): Issue[] {
    return this.issues.filter(issue => issue.state === state);
  }

  isPullRequest(issue: Issue): boolean {
    return !!issue.pull_request;
  }

  getIssueTypeLabel(issue: Issue): string {
    return this.isPullRequest(issue) ? 'Pull Request' : 'Issue';
  }

  getStateClass(state: string): string {
    return state === 'open' ? 'badge-success' : 'badge-secondary';
  }

  getLabelClass(color: string): string {
    return `label-${color}`;
  }
}