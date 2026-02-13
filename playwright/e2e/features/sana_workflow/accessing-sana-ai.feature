
  Feature: User is accessing the Sana AI chatbox/agent

    @sana-home-page
    Scenario: User gets the access to Sana AI agent
      Given User is on Sana AI workspace
      When User closes the dialog
      Then User should be able to see the outlet of the Sana AI agent

