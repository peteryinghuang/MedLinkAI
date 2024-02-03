const GoogleAPI = "AIzaSyDllUySucmUUmnWgS5VulORGYOkzE2ONSk";
const GoogleAIVersion = '/v1/models/gemini-pro';

function appendChatHistory(role, text) {
  GoogleAIHistory.contents.push({
    "role": role,
    "parts": [
      {
        "text": text
      }
    ]
  });
}

var GoogleAIHistory = {
  contents: [
    {
      "role": "user",
      "parts": [
        {
          "text": `Message from the administration team at the University of Michigan Hospital:\n\n Role: You are a medical assistant at MedLinkAI Health, and your name is MedLinkAI.\n\n Job: Ask the patient for the following information step by step. When all information are collected and the patient does not have any other questions, give out a pre-diagnosis report, which should contains the following information, to the patient. Make sure all required information are collected before giving the report.\n\n Basic information to ask for:\n\n Step 1: Ask the patient for name (required)\n\n Step 2: Ask the patient for age (required)\n\n Step 3: Ask the patient for sex (required, male or female)\n\n Step 4: Ask the patient for height in feet (optional)\n\n Step 5: Ask the patient for weight in pounds (optional)\n\n Step 6: Ask the patient for race (required, some diseases may exhibit different symptoms among different races, and understanding this information will aid in the preliminary diagnosis)\n\n Medical information to ask for:\n\n Step 7: Ask the patient for major symptom (required). Describe your main symptoms and any questions you may have.\n\n Step 8: Ask the patient for time span of the symptom (required). Specify how long the symptom has been present (e.g., one week, one month, etc.).\n\n Step 9: Ask the patient for changes and development of the symptom (required). Indicate if the symptom has worsened, improved, or remained the same.\n\n Step 10: Ask the patient for characteristics of the symptom (required). Provide details such as the location of pain, characteristics of the pain, pain spread, and duration.\n\n Step 11: Ask the patient for medication usage (required). State whether you have taken any medication. If not, indicate "No." If yes, specify when you started taking the medication and its effects.\n\n Step 12: Ask the patient for disease history (required). If you have no history of diseases, indicate "No." Otherwise, specify any diseases, surgeries, or injuries you have experienced.\n\n Step 13: Ask the patient for additional information (required). If there is no additional information, enter "No." Otherwise, provide any relevant information related to the symptom.\n\n\n When generating the report, ask the patient to download the report by clicking on the bottom right blue button named "Report".`
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": `Hello and welcome!\n I am Dr. Gemini Pro, medical assistant at the MedLinkAI Health. I am here to help you do pre-diagnosis. May I know your name?`
        }
      ]
    },
  ]
};

$('.message-submit').click(function() {
  if (GoogleAIHistory.contents.length === 2 && $('.message-input').val() === '') {
    initChat();
  }
  else {
    insertMessage();
  }
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

async function chatGoogle(userInput) {
  try {
    var apiURLHead = "https://generativelanguage.googleapis.com";
    appendChatHistory("user", userInput);
    const requestPayload = {
        contents: GoogleAIHistory.contents,
        safetySettings: [
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
            }
        ]
    };
    const apiURL = apiURLHead + GoogleAIVersion + ":generateContent?key=" + GoogleAPI;
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });
    const responseJSON = await response.json();
    const generatedText = responseJSON.candidates[0].content.parts[0].text;
    appendChatHistory("model", generatedText);
    return generatedText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  } catch (error) {
    return error;
    console.error("Error connecting to Google AI API:", error);
    throw new Error("Error connecting to Google AI API");
  }
}

function initChat() {
  $('<div class="message loading new"><figure class="avatar"><img src="./assets/img/google_logo.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="./assets/img/google_logo.png" /></figure>' + GoogleAIHistory.contents[1].parts[0].text + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 0.5);
}

async function startMessage() {
  if (GoogleAIHistory.contents.length === 2 && userMessage === '') {
    initChat();
  } else {
    $('<div class="message loading new"><figure class="avatar"><img src="./assets/img/google_logo.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    try {
      const generatedText = await chatGoogle(userMessage);
      
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="./assets/img/google_logo.png" /></figure>' + generatedText + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      i++;
    } catch (error) {
      console.error("Error generating response:", error);
    }
  }
}

async function getSummary() {
  document.getElementById("loadingReport").style.display = "none";
  document.getElementById("loadingImg").style.display = "block";
  var summaryRequest = {
    contents: [
      {
        "role": "user",
        "parts": [
          {
            "text": `System message: You are MedLinkAI, a medical assistant at MedLinkAI Health. The patient will provide you with some information about themselves and their health conditions. Your task is to generate a formatted report of the patient to make it easier for the doctor to understand the patient's condition. Your report should have the following sections in order: PERSONAL INFORMATION (including Name, Age, Sex, Height (if provided), Weight (if provided), and Race), CHIEF COMPLAINT, HISTORY OF PRESENT ILLNESS, CURRENT MEDICATIONS, PHYSICAL EXAM, ASSESSMENT & PLAN, APPOINTMENTS. Note: In the ASSESSMENT & PLAN part, you should provide possible diseases based on the patient's information and suggest possible next steps. Your output should be in plain text, not markdown.`
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": `Hello and welcome!\n I am Dr. Gemini at MedLinkAI. May I know your pre-diagnosis information?`
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": GoogleAIHistory.contents[GoogleAIHistory.contents.length - 1].parts[0].text
          }
        ]
      },
    ]
  };

  try {
    // Fetch summary from the API
    var apiURLHead = "https://generativelanguage.googleapis.com";
    const requestPayload = {
      contents: summaryRequest.contents,
      safetySettings: [
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
            }
        ]
    };
    const apiURL = apiURLHead + GoogleAIVersion + ":generateContent?key=" + GoogleAPI;
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });
    const responseJSON = await response.json();

    if (responseJSON.candidates[0].content.parts[0].text.length > 0) {
      const assistantResponse = responseJSON.candidates[0].content.parts[0].text;
      summaryRequest.contents.push({ "role": "assistant", "parts": [{"text": assistantResponse}]});

      // Create HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MedLinkAI Pre-diagnosis Report</title>
          <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
        </head>
        <body>
          <header>
            <h1>MedLinkAI Pre-diagnosis Report</h1>
            <center>
              <p class="notice">
                <b>Disclaimer</b>: This report is not a substitute for professional medical advice, diagnosis, or treatment. Users are urged to seek expertise from healthcare professionals for accurate information.
              </p>
              <p>
                <script>
                  var currentdate = new Date().toLocaleString();
                  document.write(currentdate);
                </script>
              </p>
            </center>
            <center>
              <button onclick="window.print()">Print This Page</button>
            </center>
          </header>
          <main>
            <div>${assistantResponse.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")}</div>
          </main>
          <footer>
            <p>&copy; MedLinkAI</p>
          </footer>
        </body>
        </html>
      `;

      // Create a Blob containing the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Open the URL in a new window
      window.open(url, '_blank');
      document.getElementById("loadingReport").style.display = "block";
      document.getElementById("loadingImg").style.display = "none";
    } else {
      document.getElementById("loadingReport").style.display = "block";
      document.getElementById("loadingImg").style.display = "none";
      throw new Error("Unexpected response from OpenAI API");
    }
  } catch (error) {
    document.getElementById("loadingReport").style.display = "block";
    document.getElementById("loadingImg").style.display = "none";
    console.error("Error connecting to OpenAI API:", error);
    throw new Error("Error connecting to OpenAI API");
  }
}
