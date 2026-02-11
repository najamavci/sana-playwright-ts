Feature: SANA chat workflow

  Scenario: Draft, refine, verify structure, and copy the final answer
    Given I am on the SANA chat page
    When I ask SANA to draft a delayed shipment email
    And I ask SANA to refine it with a subject line
    Then the last answer should include required elements