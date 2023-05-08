// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract BuyAnAnswer {

    // Create Events Required for Front-end Application

    // 1. postQuestion - userAddress, question, minPrice, priorityBonus, total, timestamp, BoardID -> bool
    // 2. updateProfile - headline, boardDesc, minPrice, userAddress, timestamp
    // 3. postAnswer - boardID, questionID, answerText, userAddress, timestamp
    // 4. declineAnswer - boardID, questionID, userAddress, timestamp
    // 5. deleteAskedQuestion - userAddress, timestamp, questionID


    // Create Structs for Application

    // 1. User
        // {
        //     userAddress,
        //     username,
        //     email,
        //     name,
        //     boardID
        // }
    // 2. Board
        // {
        //     boardID,
        //     ownerUserAddress,
        //     headline,
        //     boardDesc,
        //     minPrice
        // }
    // 3. Question
        // There is only one answer to a question and a question is posted to a Board that is owned by a specific user
        // {
        //     askUser,
        //     boardID,
        //     questionID,
        //     questionText,
        //     priorityBonus,
        //     total,
        //     isAnswered,
        //     timestamp  
        // }
    // 4. Answer
            // {
            //     questionID,
            //     answertext
            // }

    // Create Mappings for Application

    // 1. users: Address -> User (stores all signed up users)
    // 2. postedQuestions: Address -> Questions[] (stores all questions asked by address)
    // 3. userBoard: Address -> Board (attaches every user to a unique Board)
    // 4. receievedQuestion: BoardID -> Questions[] (stores all questions recieved at Board)
    // 5. noResponseQuestions: BoardID -> Questions[] (received and not responded Questions): All question in this must have isAnswered to be false
    // 6. answers: BoardID -> Answers[] (stores all answers given at Board)
    // 7. declined: BoardID -> Questions[] (stores all answers declined at Board)

    // Create Functions for Application
    // 0. create Profile and Board for new user input all necessary fields for both the Profile and Board
    // 1. getProfile
    // 2. updateProfile
    // 3. getBoard
    // 4. postQuestion (payable) - posted by a Asker User to a Board (owner by an Answer User): funds tranferred from Asker User to contract. The amount sent is the sum of the minPrice and priority bonus (total)
    // 5. getRecievedQuestions
    // 6. getUnansweredQuestion
    // For 7,8: check that attempting to answer or decline is the owner of the Board to prevent unauthorized access.
    // For 9: When a question is deleted, you may want to consider transferring any remaining funds associated with the question back to the Asker user.
    // 7. postAnswer (payable) - only the answer user can answer this (i.e, the owner of the board it was posted to): funds transferred from contract to Answer User
    // 8. declineAnswer (payable) - only the answer user can declined this (i.e, the owner of the board it was posted to): funds transferred from contract to Asker User
    // 9. deleteAskedQuestion (payable) - only the asker user can delete this, also removed from corresponding Board: funds transferred from contract to Asker User

    // Create Modifiers for Application

    // 1. isUser - checks if user is signed up
    // 2. isBoardOwner - checks if user is the owner of the board
    // 3. isAsker - checks if user is the asker of the question
    // 4. isAnswerer - checks if user is the answerer of the question

    // Create Variables for Application

    struct User {
        address userAddress;
        string username;
        string email;
        string name;
        uint boardID;
    }

    struct Board {
        uint boardID;
        address ownerUserAddress;
        string headline;
        string boardDesc;
        uint minPrice;
    }

    struct Question {
        address askUser;
        uint boardID;
        uint questionID;
        string questionText;
        uint priorityBonus;
        uint total;
        bool isAnswered;
        uint timestamp;
    }


    struct Answer {
        uint questionID;
        string answerText;
    }


    mapping(address => User) users;

    mapping(address => Question[]) postedQuestions;
    
    mapping(address => Board) userBoard;

    mapping(uint => Question[]) receivedQuestions;

    mapping(uint => Question[]) noResponseQuestions;

    mapping(uint => Answer[]) answers;

    mapping(uint => Question[]) declined;

    uint questionID = 0;

    uint boardID = 0;

    modifier isUser() {
        require(users[msg.sender].userAddress != address(0), "User does not exist");
        _;
    }

    modifier isBoardOwner() {
        require(userBoard[msg.sender].ownerUserAddress == msg.sender, "User is not the owner of the board");
        _;
    }

    modifier isAsker() {
        require(postedQuestions[msg.sender].length > 0, "User is not the asker of the question");
        _;
    }

    modifier isAnswerer() {
        require(receivedQuestions[userBoard[msg.sender].boardID].length > 0, "User is not the answerer of the question");
        _;
    }

    function createProfile(string memory _username, string memory _email, string memory _name) public {
        require(users[msg.sender].userAddress == address(0), "User already exists");
        users[msg.sender] = User(msg.sender, _username, _email, _name, boardID);
        boardID++;
    }

    function getProfile() public view isUser returns (User memory) {
        return users[msg.sender];
    }

    function updateProfile(string memory _headline, string memory _boardDesc, uint _minPrice) public isUser {
        userBoard[msg.sender] = Board(userBoard[msg.sender].boardID, msg.sender, _headline, _boardDesc, _minPrice);
    }

    function getBoard() public view isUser returns (Board memory) {
        return userBoard[msg.sender];
    }

    function postQuestion(string memory _questionText, uint _priorityBonus) public payable isUser {
        require(msg.value >= userBoard[msg.sender].minPrice + _priorityBonus, "Insufficient funds");
        postedQuestions[msg.sender].push(Question(msg.sender, userBoard[msg.sender].boardID, questionID, _questionText, _priorityBonus, msg.value, false, block.timestamp));
        receivedQuestions[userBoard[msg.sender].boardID].push(Question(msg.sender, userBoard[msg.sender].boardID, questionID, _questionText, _priorityBonus, msg.value, false, block.timestamp));
        noResponseQuestions[userBoard[msg.sender].boardID].push(Question(msg.sender, userBoard[msg.sender].boardID, questionID, _questionText, _priorityBonus, msg.value, false, block.timestamp));
        questionID++;
    }

    function getRecievedQuestions() public view isUser returns (Question[] memory) {
        return receivedQuestions[userBoard[msg.sender].boardID];
    }

    function getUnansweredQuestion() public view isUser returns (Question[] memory) {
        return noResponseQuestions[userBoard[msg.sender].boardID];
    }

    function postAnswer(uint _questionID, string memory _answerText) public payable isUser isBoardOwner {
        require(msg.value >= userBoard[msg.sender].minPrice, "Insufficient funds");
        answers[userBoard[msg.sender].boardID].push(Answer(_questionID, _answerText));
        for (uint i = 0; i < noResponseQuestions[userBoard[msg.sender].boardID].length; i++) {
            if (noResponseQuestions[userBoard[msg.sender].boardID][i].questionID == _questionID) {
                noResponseQuestions[userBoard[msg.sender].boardID][i].isAnswered = true;
                break;
            }
        }
        for (uint i = 0; i < receivedQuestions[userBoard[msg.sender].boardID].length; i++) {
            if (receivedQuestions[userBoard[msg.sender].boardID][i].questionID == _questionID) {
                receivedQuestions[userBoard[msg.sender].boardID][i].isAnswered = true;
                break;
            }
        }
        for (uint i = 0; i < postedQuestions[msg.sender].length; i++) {
            if (postedQuestions[msg.sender][i].questionID == _questionID) {
                postedQuestions[msg.sender][i].isAnswered = true;
                break;
            }
        }
    }

    

}
