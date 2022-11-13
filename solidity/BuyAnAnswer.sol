// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract BuyAnAnswer {
    // This will allow all users to ask (target) a question to any other user for any price
    // This will allow for users to answer/decline questions targeted to them (their eth address)
    // There must be a layer between a user asking the question and the question being answered. That is the processing layer
    // This layer will hold the funds as soon as a question is asked. If it is answered, 90% of the
    // fund are transffered to the answerer and 10% will be transfer to a processing buyananswer account.
    // If it is declined, then the user that asked the question will receive 100% of the funds back
    // If the user that answered the question cancels it, they will receive 97% of their money back.
    event AskQuestion(
        string message,
        address payable askUser,
        address payable answerUser,
        uint256 timestamp,
        uint256 price,
        string boardID
    );
    event AnswerQuestion(
        Question question,
        address payable user,
        string answer,
        uint256 timestamp
    );
    event CreateBoard(
        string boardID,
        address payable user,
        string tagline,
        uint256 timestamp
    );

    event Deposit(address sender, uint256 amount);
    event Withdrawal(address receiver, uint256 amount);
    event Transfer(address sender, address receiver, uint256 amount);

    address payable owner;

    struct Question {
        // string questionID;
        string message;
        address payable askUser;
        address payable answerUser;
        uint256 price;
        uint256 timestamp;
        string boardID;
    }

    struct Answer {
        Question question;
        address payable answerer;
        string answerText;
        uint256 timestamp;
    }

    struct Board {
        string boardID;
        address payable owner;
        string tagline;
        Question[] receivedQuestions;
        Answer[] answers;
        uint256 createdAt;
    }

    mapping(string => Question[]) boardIDToQuestions;
    mapping(address => uint256) balances;
    mapping(address => Question[]) userToReceivedQuestions;
    mapping(address => Answer[]) userToAnswers;
    mapping(string => Answer[]) boardIDToAnswers;
    mapping(string => Board) boardIDToBoard;
    mapping(address => string) addressToUsername;

    function BuyAnAnswerApp() public {
        owner = payable(msg.sender);
    }

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Withdrawal(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function transfer(address receiver, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Transfer(msg.sender, receiver, amount);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    // Send a question as an object onto the boardID -> questions mapping and the user -> receivedQuestions mapping
    // Also the price is deducted from the users balance as soon as question is asked.
    // This must be stored within the contract until one of 3 actinos takes place
    //           1. Question is answered by answerUser (93% of balance for question is transferred to answerUser, 7% to buyAnAnswer address)
    //           2. Question is cancelled by askUser before 3 days of asking the question (97% of balance is transferred to askUser, 3% to buyAnAnswer address)
    //           3. Question is cancelled by askUser after 3 days of asking the question (100% of balance is sent to askUser)
    //           4. Question is declined by answerUser (100% of balance is sent to askUser)
    function sendQuestion(
        string calldata _qst,
        address _answerUser,
        string calldata _boardID,
        uint256 _prc
    ) external {
        require(balances[msg.sender] >= _prc, "Insufficient funds");
        Question memory question = Question(
            _qst,
            payable(msg.sender),
            payable(_answerUser),
            _prc,
            block.timestamp,
            _boardID
        );
        boardIDToQuestions[_boardID].push(question);
        userToReceivedQuestions[_answerUser].push(question);
        balances[msg.sender] -= _prc;
        // balances[_answerUser] += _prc;
        emit AskQuestion(
            _qst,
            payable(msg.sender),
            payable(_answerUser),
            block.timestamp,
            _prc,
            _boardID
        );
        emit Transfer(msg.sender, _answerUser, _prc);
    }

    // if a question is answered it can't be answered again
    // it is imparative to keep a track of the
    // balanced received by the contract in asking questions and the
    // exited balanced with answering questions
    // Currently a user is able to answer one question multiple times and
    // is using this keeping increasing the balance which is obviously
    // a bug and must be corrected at the earliest.
    function sendAnswer(
        string calldata _boardID,
        uint256 _index,
        string calldata _answer
    ) external {
        Question memory question = boardIDToQuestions[_boardID][_index];
        if (question.answerUser == payable(msg.sender)) {
            Answer memory answer = Answer(
                question,
                payable(msg.sender),
                _answer,
                block.timestamp
            );
            boardIDToAnswers[_boardID].push(answer);
            userToAnswers[payable(msg.sender)].push(answer);
            balances[question.answerUser] += question.price;
            emit AnswerQuestion(
                question,
                payable(msg.sender),
                _answer,
                block.timestamp
            );
        } else {
            // err handling (look into using the required keyword in solidity to handle stuff like this)
        }
    }

    //
    // Functions for creating and fetching custom usernames. If a user updates
    // their username it will update for all of their messages
    function createUser(string calldata _name) external {
        addressToUsername[msg.sender] = _name;
    }

    //
    function getUsernameForAddress(address _user)
        external
        view
        returns (string memory)
    {
        return addressToUsername[_user];
    }

    //
    //  Currently, there is no support for returning nested lists, so the length
    //  of messages needs to be fetched and then retrieved by index. This is not
    //  fast but it is the most gas efficient method for storing and
    //  fetching data. Ideally this only needs to be done once per room load
    function getQuestionCountForBoard(string calldata _boardID)
        external
        view
        returns (uint256)
    {
        return boardIDToQuestions[_boardID].length;
    }

    function getQuestionsForUser(address _usrAddress)
        external
        view
        returns (Question[] memory)
    {
        return userToReceivedQuestions[_usrAddress];
    }

    function getQuestionsForCurrentUser()
        external
        view
        returns (Question[] memory)
    {
        return userToReceivedQuestions[payable(msg.sender)];
    }

    function getAnswerForCurrentUser() external view returns (Answer[] memory) {
        return userToAnswers[payable(msg.sender)];
    }

    //
    // There is no support for returning a struct to web3, so this needs to be
    // returned as multiple items. This will throw an error if the index is invalid
    function getQuestionByIndexForBoard(
        string calldata _boardID,
        uint256 _index
    )
        external
        view
        returns (
            string memory,
            address,
            address,
            uint256,
            uint256,
            string memory
        )
    {
        Question memory question = boardIDToQuestions[_boardID][_index];
        return (
            question.message,
            question.askUser,
            question.answerUser,
            question.price,
            question.timestamp,
            question.boardID
        );
    }

    function getAnswerFromBoardIDAndIndex(
        string calldata _boardID,
        uint256 _index
    )
        external
        view
        returns (
            address,
            string memory,
            address,
            string memory,
            uint256,
            uint256
        )
    {
        Answer memory answer = boardIDToAnswers[_boardID][_index];
        string memory answerText = answer.answerText;
        Question memory question = answer.question;
        address asker = question.askUser;
        address answerer = answer.answerer;
        string memory questionText = question.message;
        uint256 price = question.price;
        uint256 answeredOn = answer.timestamp;
        return (asker, questionText, answerer, answerText, price, answeredOn);
    }

    //
    function getAnswerByQuestionID(string calldata _questionID)
        external
        view
        returns (string memory, string memory)
    {}

    function kill() external {
        if (owner == msg.sender) {
            selfdestruct(owner);
        }
    }
}
