
# Example Request

Method: 		POST
URL: 			http://localhost:3000/v1/summaries


## Headers

Authorization: 	Bearer key1

Content-Type: 	application/json

Body (raw → JSON)
{
  "tenantId": "clinic-main",
  "note": {
    "raw": "Client reports increased anxiety this week due to work deadlines. They slept 4-5 hours nightly. Clinician observed fidgeting and rapid speech. No self-harm or suicidal thoughts were mentioned. Discussed grounding techniques and scheduling breaks. Plan: practice grounding twice daily and follow up next week."
  },
  "options": {
    "format": "soap",
    "plainLanguage": true,
    "temperature": 0.2
  }
}



## Notes (important!)

TenantId in the body is optional. If you include it, it must match the tenant implied by the API key or you’ll get 403. See .env for the keys list ( TENANT_KEYS_JSON ).

Temperature is capped server-side to 0.2 anyway.



# Example Response

{
  "requestId": "ae514c4d-161e-4edc-ba81-4438af867e30",
  "tenantId": "clinic-abc",
  "outputs": {
      "format": "soap",
      "clinicalSummary": {
            "subjective": "Client reports increased anxiety this week due to work deadlines. They also report sleeping 4-5 hours nightly. The session focused on managing anxiety symptoms.",
            "objective": "Clinician observed fidgeting and rapid speech during the session.",
            "assessment": "Client is experiencing heightened anxiety related to work stress and sleep disruption. No safety concerns noted in the provided text.",
            "plan": [
                "Discussed grounding techniques and scheduling breaks.",
                "Client to practice grounding techniques twice daily.",
                "Follow up scheduled for next week."
            ]
        },
    "plainLanguageSummary": "This week, you experienced more anxiety because of work deadlines, and you were only able to sleep about 4 to 5 hours each night. During our time together, I noticed you were fidgeting and speaking quickly, which can be signs of feeling anxious. You did not mention any thoughts of harming yourself or feeling suicidal, which is important to note. We talked about some grounding techniques that can help you feel more calm and present, and we also discussed the importance of taking breaks during your day. The plan is for you to try practicing these grounding exercises twice a day. We will check in again next week to see how you’re doing and adjust the plan if needed. If anything changes or you need support before then, please reach out. Some details about your overall mood or other stressors were not discussed in the information provided."
  },
  "metadata": {
    "model": "azure",
    "latencyMs": 6381,
    "usage": {
            "clinical": {
                "completion_tokens": 123,
                "completion_tokens_details": {
                    "accepted_prediction_tokens": 0,
                    "audio_tokens": 0,
                    "reasoning_tokens": 0,
                    "rejected_prediction_tokens": 0
                },
                "prompt_tokens": 418,
                "prompt_tokens_details": {
                    "audio_tokens": 0,
                    "cached_tokens": 0
                },
                "total_tokens": 541
            },
            "plain": {
                "completion_tokens": 149,
                "completion_tokens_details": {
                    "accepted_prediction_tokens": 0,
                    "audio_tokens": 0,
                    "reasoning_tokens": 0,
                    "rejected_prediction_tokens": 0
                },
                "prompt_tokens": 161,
                "prompt_tokens_details": {
                    "audio_tokens": 0,
                    "cached_tokens": 0
                },
                "total_tokens": 310
            }
        }
  }
}
