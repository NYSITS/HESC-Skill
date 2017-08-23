/*
  Higher Education Alexa Skill.
  This is the Higher Education Alexa Skill developed for the Higher Education Services Corporation (HESC)
  built with the Amazon Alexa Skills Kit. The Intent Schema, Custom Slots, and Sample Utterances for this skill
  on the NYS ITS GitHub repository located at ...
  Developed by Nicholas Stucchi
  Developed on August 23, 2017
  Modified on
*/

'use strict';

// var grants = require('./grants');

/*
  Route the incoming request based on type (LaunchRequest, IntentRequest,
  etc.) The JSON body of the request is provided in the event parameter.
*/
exports.handler = function(event, context) {
  try {
    console.log("event.session.application.applicationId=" + event.session.application.applicationId);

    /*
      Uncomment this IF STATEMENT and populate it with your skill's application ID
      To prevent someone else from configuring a skill that sends requests to this function.
    */

    if (event.session.application.applicationId !== "amzn1.ask.skill.223d30c7-de68-4226-9c82-5cc8e648bb21") {
      context.fail("Invalid Application ID");
    }

    if (event.session.new) {
      onSessionStarted({requestId: event.request.requestId}, event.session);
    }

    if (event.request.type === "LaunchRequest") {
      onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "IntentRequest") {
      onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

// Called when the session starts.
function onSessionStarted(sessionStartedRequest, session) {
  console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
  // Add any session init logic here.
}

// Called when the user invokes the skill without specifying an intent.
function onLaunch(launchRequest, session, callback) {
  console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);
  getWelcomeResponse(callback);
}

// Called when the user specifies an intent for the skill.
function onIntent(intentRequest, session, callback) {
  console.log("onIntent requestId=" + intentRequest.requestId + ", sessionId=" + session.sessionId);

  var intent = intentRequest.intent;
  var intentName = intentRequest.intent.name;

  // Dispatch to custom intents here:
  if ("TapEligibilityIntent" === intentName) {
    tapEligibility(intent, session, callback);
  } else if ("AMAZON.YesIntent" === intentName) {
    if (session.attributes.previousPlace === "TAP Start") {
      tapQuestion1(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 1") {
      tapQuestion2(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 2") {
      tapQuestion3(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 3") {
      tapQuestion4(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 4") {
      tapQuestion5(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 5") {
      tapQuestion6(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 6") {
      tapQuestion7(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 7") {
      tapQuestion8(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 8") {
      tapQuestion9(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 8") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 10") {
      isTapEligible(intent, session, callback);
    }
  } else if ("AMAZON.NoIntent" === intentName) {
    if (session.attributes.previousPlace === "TAP Start") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 1") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 2") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 3") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 4") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 5") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 6") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 7") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 8") {
      isNotTapEligible(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 9") {
      tapQuestion10(intent, session, callback);
    } else if (session.attributes.previousPlace === "TAP 10") {
      isNotTapEligible(intent, session, callback);
    }
  } else {
    throw "Invalid Intent";
  }
}

// Called when the user ends the session. Is not called when the skill returns shouldEndSession=true.
function onSessionEnded(sessionEndedRequest, session) {
  console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
  // Add any cleanup logic here.
}

// --------------------------------------- SKILL SPECIFIC BUSINESS LOGIC -------------------------------------------
function getWelcomeResponse(callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Welcome to Higher Education";
  var speechOutput = "Welcome to Higher Education";
  var repromptText = "Welcome to Higher Education";
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "Welcome"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapEligibility(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "TAP Eligibility";
  var speechOutput = "I will ask you a series of questions. Please reply with yes or no, are you ready to begin? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP Start"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion1(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 1";
  var speechOutput = "Are you a legal resident of NYS and have you resided in NYS for twelve continuous months? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 1"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion2(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 2";
  var speechOutput = "Are you a U.S. citizen or an Eligible Non-Citizen? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 2"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion3(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 3";
  var speechOutput = "Have you graduated from a high school in the United States, or have an equivalent degree? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 3"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion4(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 4";
  var speechOutput = "Will you study at an approved postsecondary institution in New York State? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 4"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion5(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 5";
  var speechOutput = "Will you be matriculated in an approved program of study, and be in good academic standing, with at least a C average as of the fourth semester payment? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 5"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion6(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 6";
  var speechOutput = "Will you be enrolled as a full-time student take twelve or more credits applicable toward the degree program, per semester? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 6"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion7(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 7";
  var speechOutput = "Will you be charged at least 200 dollars in tuition per year? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 7"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion8(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 8";
  var speechOutput = "Do you meet income eligibility limitations? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 8"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion9(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 9";
  var speechOutput = "Are you in default on any State Awards, State Student Loans, or Federal Student Loans? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 9"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function tapQuestion10(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Question 10";
  var speechOutput = "Are you in compliance with the terms of any service condition imposed by a NYS Award? ";
  var repromptText = speechOutput;
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "TAP 10"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function isTapEligible(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Eligible";
  var speechOutput = "Congratulations! You are considered eligible for TAP. Is there anything else I can help you with? ";
  var repromptText = "Is there anything else I can help you with? ";
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "Eligible For TAP"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function isNotTapEligible(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Not Eligible";
  var speechOutput = "I'm sorry, but you are not eligible for TAP. Is there something else I can help you with? ";
  var repromptText = "Is there something else I can help you with? ";
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "Not Eligible For TAP"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function grantsProgram(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE;
  var speechOutput;
  var repromptText;
  var shouldEndSession = false;
}

function endSession(intent, session, callback) {
  callback(session.attributes, buildSpeechletResponseWithoutCard("Thank you for using Higher Education. Have a wonderful day!", "", true));
}

// --------------------------------------- HELPER FUNCTIONS THAT BUILD ALL RESPONSES -------------------------------------------
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    card: {
      type: "Simple",
      title: title,
      content: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
