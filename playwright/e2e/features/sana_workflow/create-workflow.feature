Feature: Create a new workflow on Sana AI

  @create-workflow
  Scenario Outline: Create a manual trigger workflow
    When the user creates a new workflow
    And the user sets the trigger to "<trigger>"

    And the user adds a step "<step1>" with note "<q1>"
    And the user adds a step "<step2>" with note "<q2>"

    When the user saves the workflow
    And user clicks on Done button
    Then the user should be redirected to the home page now


    Examples:
      | trigger      | step1          | q1     | step2    | q2         |
      | Run manually | Meeting prep | Notes    | Q&A      | Coffee break |