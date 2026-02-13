Feature: Create a new workflow on Sana AI

  Background:
    Given User is on Sana AI workspace

  @workflow
  Scenario Outline: Create a manual trigger workflow
    When the user creates a new workflow
    And the user sets the trigger to "<trigger>"
    And the user adds a step "<step1>" with question "<q1>" and instruction "<i1>"
    And the user adds a step "<step2>" with question "<q2>" and instruction "<i2>"
    When the user saves the workflow
    Then the workflow should be visible in the workflows list

    Examples:
      | trigger      | step1          | q1     | i1             | step2          | q2        | i2           |
      | Run manually | Interview prep | Role?  | Ask 3 questions | Quick feedback | Pass/Fail? | Give 1 reason |