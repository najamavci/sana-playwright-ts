# Created by naja at 2026-02-11
Feature: Create a new worklow on Sana
  @workflow @create
  Scenario: Create a new workflow
    Given I am on the Sana Workflows page
    When I create a new workflow named "sana-workflow-testing-assignment"
    And I save and confirm the workflow creation
    Then I should see the workflow "sana-workflow-testing-assignment" in the workflows list