App Classes and Functions

Social {
   string platform,
   string socialUrl
}

User {
  address userAddress,
  string BoardID,
  string username,
  string name,
  string email,
  string headline,
  string bio,
  string minimumPrice,
  Social[] socials,
  Question[] askedQuestions
}

Question {
  string QuestionText,
  string BoardID,
  int price,
  int priorityBonus,
  address askUser,
  address answerUser,
  boolean isAnswered
}

Answer {
  Question question,
  string answerText
}

mapping(user => Question[]): history // can be asked by user and answered, asked by user a declined, answered by user
mapping(user => Question[]): receivedQuestions // user is answerUser in all questions
mapping(user => Question[]): declinedQuestions // user is answerUser in all questions
mapping(user => Answer[]): answeredQuestions // user is answerUser in all questions

1. create profile
2. save profile
3. post question (payable)
4. post answer (receive money)
5. decline question
5. get user history
6. get receivedquestions
7. get answerHistory
8. get declineHistory