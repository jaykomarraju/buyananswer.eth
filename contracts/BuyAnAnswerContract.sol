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

    mapping(uint256 => Question) public questions;

    constructor(address payable _feeAddress) {
        feeAddress = _feeAddress;
    }

    function askQuestion(address payable _answerer, uint256 _questionId) external payable {
        require(msg.value > 0, "Amount should be greater than 0");
        require(_answerer != msg.sender, "You cannot ask question to yourself");
        questions[_questionId] = Question(payable(msg.sender), _answerer, msg.value, false, false);
    }

    function answerQuestion(uint256 _questionId) external {
        Question storage question = questions[_questionId];
        require(msg.sender == question.answerer, "Only selected user can answer the question");
        require(!question.cancelled, "The question has been cancelled");
        
        uint256 fee = question.amount * 5 / 100;  // Calculate 5% fee
        uint256 payout = question.amount - fee;   // Calculate payout

        question.answerer.transfer(payout);
        feeAddress.transfer(fee);

        question.answered = true;
    }

    function declineQuestion(uint256 _questionId) external {
        Question storage question = questions[_questionId];
        require(msg.sender == question.answerer, "Only selected user can decline the question");
        require(!question.cancelled, "The question has been cancelled");

        question.asker.transfer(question.amount);

        question.answered = true;
    }

    function cancelQuestion(uint256 _questionId) external {
        Question storage question = questions[_questionId];
        require(msg.sender == question.asker, "Only asker can cancel the question");

        uint256 fee = question.amount * 2 / 100;  // Calculate 2% fee
        uint256 refund = question.amount - fee;   // Calculate refund

        question.asker.transfer(refund);
        feeAddress.transfer(fee);

        question.cancelled = true;
    }
}
