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
        bytes32 boardID
    );
    event AnswerQuestion(
        Question question,
        address payable user,
        string answer,
        uint256 timestamp
    );
    event CreateBoard(
        bytes32 boardID,
        address payable user,
        string boardHeadline,
        string boardDesc,
        uint256 minQuestionPrice,
        uint256 timestamp
    );
    event CreateUser(
        address payable userAddress,
        string username,
        string email,
        string name,
        bytes32 boardID,
        string INSTAGRAM
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
        bytes32 boardID;
        bool isAnswered;
    }

    struct User {
        address payable userAddress;
        string username;
        string email;
        string name;
        bytes32 boardID;
        // Question[] askedQuestions;
        // Answer[] answeredQuestions;
        string INSTAGRAM;
        // string LINKEDIN;
        // string FACEBOOK;
        // string TWITTER;
    }

    struct Answer {
        Question question;
        address payable answerer;
        string answerText;
        uint256 timestamp;
    }

    struct Board {
        bytes32 boardID;
        address payable owner;
        string boardHeadline;
        string boardDesc;
        uint256 minQuestionPrice;
        // Question[] receivedQuestions;
        // Answer[] answers;
        uint256 createdAt;
    }

    mapping(bytes32 => Question[]) boardIDToQuestions;
    mapping(bytes32 => Question[]) boardIDToDeclinedQuestions;
    mapping(bytes32 => Question[]) boardIDToAnsweredQuestions;
    mapping(address => uint256) balances;
    mapping(address => Question[]) userToReceivedQuestions;
    mapping(address => Question[]) userToAskedQuestions;
    mapping(address => Answer[]) userToAnswers;
    mapping(bytes32 => Answer[]) boardIDToAnswers;
    mapping(bytes32 => Board) boardIDToBoard;
    // mapping(address => string) addressToUsername;
    mapping(address => User) addressToUser;

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

    function transfer(
        address sender,
        address receiver,
        uint256 amount
    ) public {
        require(balances[sender] >= amount, "Insufficient funds");
        emit Transfer(sender, receiver, amount);
        balances[sender] -= amount;
        balances[receiver] += amount;
    }

    // address payable userAddress;
    // string username;
    // string email;
    // string name;
    // string boardID;
    // Question[] askedQuestions;
    // Answer[] answeredQuestions;
    // string boardHeadline;
    // string boardDesc;
    // uint256 minQuestionPrice;
    // string INSTAGRAM;
    // string LINKEDIN;
    // string FACEBOOK;
    // string TWITTER;

    // function toBytes(string calldata x) public returns (bytes memory b) {
    //     b = new bytes(32);
    //     assembly { mstore(add(b, 32), x.offset) }
    // }
    function createBoardID(string calldata usrnm, string calldata eml)
        internal
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(usrnm, eml));
    }

    function createBoard(
        string calldata _boardHeadline,
        string calldata _boardDesc,
        uint256 _minQuestionPrice
    ) external {
        require(
            addressToUser[(msg.sender)].boardID != 0,
            "create a profile first"
        );
        Board memory creationBoard = Board(
            addressToUser[(msg.sender)].boardID,
            addressToUser[(msg.sender)].userAddress,
            _boardHeadline,
            _boardDesc,
            _minQuestionPrice,
            block.timestamp
        );
        boardIDToBoard[addressToUser[(msg.sender)].boardID] = creationBoard;
        emit CreateBoard(
            addressToUser[(msg.sender)].boardID,
            addressToUser[(msg.sender)].userAddress,
            _boardHeadline,
            _boardDesc,
            _minQuestionPrice,
            block.timestamp
        );
    }

    // this is a function to create a user initially
    function createUser(
        string calldata _username,
        string calldata _email,
        string calldata _name,
        string calldata _socialLink_INSTAGRAM // string calldata _socialLink_LINKEDIN,
    ) external // string calldata _socialLink_FACEBOOK,
    // string calldata _socialLink_TWITTER
    {
        bytes32 _boardID = createBoardID(_username, _email);
        User memory u = User(
            payable(msg.sender),
            _username,
            _email,
            _name,
            _boardID,
            _socialLink_INSTAGRAM
            // _socialLink_LINKEDIN,
            // _socialLink_FACEBOOK,
            // _socialLink_TWITTER
        );

        addressToUser[payable(msg.sender)] = u;

        emit CreateUser(
            // address payable userAddress,
            // string username,
            // string email,
            // string name,
            // bytes32 boardID,
            // string INSTAGRAM
            payable(msg.sender),
            _username,
            _email,
            _name,
            _boardID,
            _socialLink_INSTAGRAM
        );
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
        uint256 _prc
    ) external payable {
        // require(balances[msg.sender] >= _prc, "Insufficient funds");
        // if (msg.value != _prc) {}
        bytes32 _boardID = addressToUser[_answerUser].boardID;
        uint256 minP = boardIDToBoard[_boardID].minQuestionPrice;
        require(msg.value == _prc, "You have not sent the price amount");
        require(_boardID != 0, "user you are asking is not registered");
        require(
            _prc >= minP,
            "the price you have set is lower than the minimum price set by the users you are asking."
        );
        Question memory question = Question(
            _qst,
            payable(msg.sender),
            payable(_answerUser),
            _prc,
            block.timestamp,
            _boardID,
            false
        );
        boardIDToQuestions[_boardID].push(question);
        userToReceivedQuestions[_answerUser].push(question);
        userToAskedQuestions[payable(msg.sender)].push(question);
        balances[msg.sender] -= _prc;
        balances[address(this)] += _prc;
        // balances[_answerUser] += _prc;
        emit AskQuestion(
            _qst,
            payable(msg.sender),
            payable(_answerUser),
            block.timestamp,
            _prc,
            _boardID
        );
        emit Transfer(msg.sender, address(this), _prc);
    }

    // if a question is answered/declined it can't be answered again
    // it is imparative to keep a track of the
    // balanced received by the contract in asking questions and the
    // exited balanced with answering questions.

    function declineAnswer(bytes32 _boardID, uint256 _index) external payable {
        Question memory question = boardIDToQuestions[_boardID][_index];
        require(question.answerUser == payable(msg.sender));
        require(
            !(boardIDToQuestions[_boardID][_index].isAnswered),
            "Already answered/declined"
        );
        boardIDToQuestions[_boardID][_index].isAnswered = true;

        question.isAnswered = true;
        boardIDToDeclinedQuestions[_boardID].push(question);
    }

    function sendAnswer(
        bytes32 _boardID,
        uint256 _index,
        string calldata _answer
    ) external payable {
        Question memory question = boardIDToQuestions[_boardID][_index];
        require(
            question.answerUser == payable(msg.sender),
            "Not authorized to answer."
        );
        if (!question.isAnswered) {
            boardIDToQuestions[_boardID][_index].isAnswered = true;
            question.isAnswered = true;

            if (question.answerUser == payable(msg.sender)) {
                Answer memory answer = Answer(
                    question,
                    payable(msg.sender),
                    _answer,
                    block.timestamp
                );
                boardIDToAnswers[_boardID].push(answer);
                boardIDToAnsweredQuestions[_boardID].push(question);
                userToAnswers[payable(msg.sender)].push(answer);

                uint256 balanceToAnswerer = (question.price * 9) / 10;
                // balances[question.answerUser] += balanceToAnswerer;
                transfer(address(this), question.answerUser, balanceToAnswerer);
                emit AnswerQuestion(
                    question,
                    payable(msg.sender),
                    _answer,
                    block.timestamp
                );
            } else {
                // err handling (look into using the required keyword in solidity to handle stuff like this)
            }
        } else {
            emit AnswerQuestion(
                question,
                payable(msg.sender),
                "already answered",
                block.timestamp
            );
        }
    }

    //
    // Functions for creating and fetching custom usernames. If a user updates
    // their username it will update for all of their messages
    // function createUser(string calldata _name) external {
    //     addressToUsername[msg.sender] = _name;
    // }

    //
    function getUserForAddress(address _user)
        external
        view
        returns (string memory, bytes32)
    {
        return (addressToUser[_user].username, addressToUser[_user].boardID);
    }

    function getProfileFromUserAddress(address _user)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory
        )
    {}

    function getBoardFromUserAddress(address _user)
        external
        view
        returns (Board memory)
    {
        return (boardIDToBoard[addressToUser[_user].boardID]);
    }

    function getThisUser() external view returns (string memory, bytes32) {
        address _user = payable(msg.sender);
        return (addressToUser[_user].username, addressToUser[_user].boardID);
    }

    //
    //  Currently, there is no support for returning nested lists, so the length
    //  of messages needs to be fetched and then retrieved by index. This is not
    //  fast but it is the most gas efficient method for storing and
    //  fetching data. Ideally this only needs to be done once per room load
    function getQuestionCountForBoard(bytes32 _boardID)
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
    function getQuestionByIndexForBoard(bytes32 _boardID, uint256 _index)
        external
        view
        returns (
            string memory,
            address,
            address,
            uint256,
            uint256,
            bytes32,
            bool
        )
    {
        Question memory question = boardIDToQuestions[_boardID][_index];
        return (
            question.message,
            question.askUser,
            question.answerUser,
            question.price,
            question.timestamp,
            question.boardID,
            question.isAnswered
        );
    }

    function getUserByAddress(address _userAddress)
        external
        view
        returns (User memory)
    {
        User memory user = addressToUser[_userAddress];
        return (user);
    }

    function getAnswerFromBoardIDAndIndex(bytes32 _boardID, uint256 _index)
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
