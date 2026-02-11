# Created by naja at 2026-02-11
Feature: Edit an existing workflow on Sana

  @workflow @edit
  Scenario: Edit an existing workflow
    Given a workflow named "e2e-workflow-<unique>" exists
    When I rename the workflow "e2e-workflow-<unique>" to "e2e-workflow-<unique>-edited"
    Then I should see the workflow "e2e-workflow-<unique>-edited" in the workflows list