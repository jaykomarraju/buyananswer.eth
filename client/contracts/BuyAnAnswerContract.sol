// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract BuyAnAnswerContract {
    address payable public feeAddress;
    
    struct Question {
        address payable asker;
        address payable answerer;
        uint128 amount;
        bool answered;
        bool cancelled;
    }

    uint256 public latestQuestionId; 
    mapping(string => uint256) public firebaseDocIdToQuestionId; 
    mapping(uint256 => Question) public questions; 

    event QuestionAsked(uint256 questionId, string firebaseDocId, address asker, address answerer, uint128 amount);
    event QuestionAnswered(uint256 questionId, string firebaseDocId, address answerer);
    event QuestionDeclined(uint256 questionId, string firebaseDocId, address answerer);
    event QuestionCancelled(uint256 questionId, string firebaseDocId, address asker);

    constructor(address payable _feeAddress) {
        feeAddress = _feeAddress;
    }

    function askQuestion(string calldata firebaseDocId, address payable _answerer) external payable {
        require(msg.value > 0, "Amount should be greater than 0");
        require(_answerer != msg.sender, "You cannot ask question to yourself");

        uint256 questionId = ++latestQuestionId;

        firebaseDocIdToQuestionId[firebaseDocId] = questionId;

        questions[questionId] = Question(payable(msg.sender), _answerer, uint128(msg.value), false, false);
        
        emit QuestionAsked(questionId, firebaseDocId, msg.sender, _answerer, uint128(msg.value));
    }

    function answerQuestion(string calldata firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.answerer, "Only selected user can answer the question");
        require(!question.cancelled, "The question has been cancelled");
        
        uint128 fee = uint128(question.amount * 5 / 100);  
        uint128 payout = question.amount - fee;   

        question.answerer.transfer(payout);
        feeAddress.transfer(fee);

        question.answered = true;
        
        emit QuestionAnswered(questionId, firebaseDocId, msg.sender);
    }

    function declineQuestion(string calldata firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.answerer, "Only selected user can decline the question");
        require(!question.cancelled, "The question has been cancelled");

        question.asker.transfer(question.amount);

        question.answered = true;
        
        emit QuestionDeclined(questionId, firebaseDocId, msg.sender);
    }

    function cancelQuestion(string calldata firebaseDocId) external {
        uint256 questionId = firebaseDocIdToQuestionId[firebaseDocId];
        Question storage question = questions[questionId];
        require(msg.sender == question.asker, "Only asker can cancel the question");

        uint128 fee = uint128(question.amount * 2 / 100);  
        uint128 refund = question.amount - fee;   

        question.asker.transfer(refund);
        feeAddress.transfer(fee);

        question.cancelled = true;

        emit QuestionCancelled(questionId, firebaseDocId, msg.sender);
    }
}
