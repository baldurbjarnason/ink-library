
export function getWorkspaceAsLabel (workspace) {
  if (workspace.startsWith('Public')) {
    return 'Public Scholarship'
  } else {
    return workspace
  }
}