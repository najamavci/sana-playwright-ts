# Created by naja at 2026-02-11
Feature: Create a new worklow on Sana
  @workflow @create
  Scenario: Create a new workflow
    Given I am on the Workflows page
    When I create a new workflow named "e2e-workflow-<unique>"
    Then I should see the workflow "e2e-workflow-<unique>" in the workflows list
