// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BAA_main {
    // mapping of question ID to question data
    mapping(uint256 => Question) public questions;
    uint256 public questionCount;

    // struct to hold question data
    struct Question {
        address payable asker;
        address payable answerer;
        string question;
        string answer;
        uint256 price;
        bool answered;
    }

    // event to be emitted when a question is answered
    event QuestionAnswered(uint256 questionId);

    // function to submit a question
    function submitQuestion(string memory _question, uint256 _price)
        public
        payable
    {
        questionCount++;

        uint256 questionId = questionCount;
        questions[questionId] = Question(
            payable(msg.sender),
            payable(address(0)),
            _question,
            "",
            _price,
            false
        );
    }

    // function to answer a question and get paid
    function answerQuestion(uint256 _questionId, string memory _answer)
        public
        payable
    {
        require(questions[_questionId].answerer == address(0)); // check if question is not already answered
        require(msg.sender != questions[_questionId].asker); // check if sender is not the asker
        require(msg.value >= questions[_questionId].price); // check if sender paid enough

        questions[_questionId].answerer = payable(msg.sender);
        questions[_questionId].answer = _answer;
        questions[_questionId].answered = true;

        // transfer payment to answerer
        questions[_questionId].answerer.transfer(msg.value);

        emit QuestionAnswered(_questionId);
    }

    // function to get the answer to a question
    function getAnswer(uint256 _questionId)
        public
        view
        returns (string memory)
    {
        require(questions[_questionId].answered); // check if question is answered
        return questions[_questionId].answer;
    }
}
