// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract BuyAnAnswerContract {
    address payable public feeAddress;
    
    struct Question {
        address payable asker;
        address payable answerer;
        uint256 amount;
        bool answered;
        bool cancelled;
    }

    uint256 public latestQuestionId; // A counter to assign unique ids to questions.
    mapping(string => uint256) public firebaseDocIdToQuestionId; // A mapping from Firebase document id to question id.
    mapping(uint256 => Question) public questions; // A mapping from question id to Question struct.

    constructor(address payable _feeAddress) {
        feeAddress = _feeAddress;
    }

    function askQuestion(string memory firebaseDocId, address payable _answerer) external payable {
        require(msg.value > 0, "Amount should be greater than 0");
        require(_answerer != msg.sender, "You cannot ask question to yourself");

        // Assign a unique id to the question and increment the counter.
        uint256 questionId = ++latestQuestionId;

        // Store the mapping from Firebase document id to question id.
        firebaseDocIdToQuestionId[firebaseDocId] = questionId;

        // Store the question.
        questions[questionId] = Question(payable(msg.sender), _answerer, msg.value, false, false);
    }

    function answerQuestion(string memory firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.answerer, "Only selected user can answer the question");
        require(!question.cancelled, "The question has been cancelled");
        
        uint256 fee = question.amount * 5 / 100;  // Calculate 5% fee
        uint256 payout = question.amount - fee;   // Calculate payout

        question.answerer.transfer(payout);
        feeAddress.transfer(fee);

        question.answered = true;
    }

    function declineQuestion(string memory firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.answerer, "Only selected user can decline the question");
        require(!question.cancelled, "The question has been cancelled");

        question.asker.transfer(question.amount);

        question.answered = true;
    }

    function cancelQuestion(string memory firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.asker, "Only asker can cancel the question");

        uint256 fee = question.amount * 2 / 100;  // Calculate 2% fee
        uint256 refund = question.amount - fee;   // Calculate refund

        question.asker.transfer(refund);
        feeAddress.transfer(fee);

        question.cancelled = true;
    }
}
