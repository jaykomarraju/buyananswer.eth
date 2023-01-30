pragma solidity ^0.8.0;

contract BuyAnAnswer {
    struct Question {
        address asker;
        address answerer;
        uint amount;
        string question;
        string answer;
    }

    mapping (bytes32 => Question) questions;
    bytes32[] public questionIds;

    function askQuestion(string memory _question, uint _amount) public payable {
        bytes32 questionId = keccak256(abi.encodePacked(_question, now));
        questions[questionId] = Question({
            asker: msg.sender,
            answerer: address(0),
            amount: _amount,
            question: _question,
            answer: ""
        });
        questionIds.push(questionId);
    }

    function answerQuestion(bytes32 _questionId, string memory _answer) public {
        Question storage question = questions[_questionId];
        require(question.answerer == address(0), "Question already answered");
        require(question.asker != msg.sender, "Cannot answer own question");
        require(msg.value >= question.amount, "Insufficient payment");

        question.answerer = msg.sender;
        question.answer = _answer;

        question.asker.transfer(msg.value);
    }

    function getQuestion(bytes32 _questionId) public view returns (
        address asker,
        address answerer,
        uint amount,
        string memory question,
        string memory answer
    ) {
        Question storage question = questions[_questionId];
        asker = question.asker;
        answerer = question.answerer;
        amount = question.amount;
        question = question.question;
        answer = question.answer;
    }
}