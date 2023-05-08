// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract BuyAnAnswer {
    event AskQuestion(
        string message,
        address payable askUser,
        address payable answerUser,
        uint256 timestamp,
        uint256 price,
        bytes32 boardID,
        uint256 questionIndex
    );

    event AnswerQuestion(
        bytes32 boardID,
        uint256 questionIndex,
        address payable user,
        string answer,
        uint256 timestamp
    );

    event DeclineQuestion(
        bytes32 boardID,
        uint256 questionIndex,
        address payable user,
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
        string message;
        address payable askUser;
        address payable answerUser;
        uint256 price;
        uint256 timestamp;
        bytes32 boardID;
        bool isAnswered;
        bool isDeclined;
    }

    struct User {
        address payable userAddress;
        string username;
        string email;
        string name;
        bytes32 boardID;
        string INSTAGRAM;
    }

    struct Board {
        bytes32 boardID;
        address payable owner;
        string boardHeadline;
        string boardDesc;
        uint256 minQuestionPrice;
        uint256 createdAt;
    }

    mapping(bytes32 => Question[]) boardIDToQuestions;
    mapping(address => uint256) balances;
    mapping(address => User) addressToUser;
    mapping(bytes32 => Board) boardIDToBoard;

    uint256 public questionCancellationFeePercentage = 3;
    uint256 public answererRewardPercentage = 90;
    uint256 public questionAnsweringWindow = 3 days;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() public {
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
        payable(msg.sender).transfer(amount);
    }

    function transfer(
        address sender,
        address receiver,
        uint256 amount
    ) private {
        require(balances[sender] >= amount, "Insufficient funds");
        require(
            msg.sender == sender || msg.sender == address(this),
            "Unauthorized transfer"
        );
        emit Transfer(sender, receiver, amount);
        balances[sender] -= amount;
        balances[receiver] += amount;
    }

    function createBoardID(
        string calldata usrnm,
        string calldata eml
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(usrnm, eml));
    }

    function createBoard(
        string calldata _boardHeadline,
        string calldata _boardDesc,
        uint256 _minQuestionPrice
    ) external {
        require(
            addressToUser[msg.sender].boardID != 0,
            "create User before creating board"
        );
        // bytes32 boardID = createBoardID(
        //     addressToUser[msg.sender].username,
        //     addressToUser[msg.sender].email
        // );
        // Error: Invalid type for argument in function call. Invalid implicit conversion from string storage ref to string calldata requested.
        // We can fix it by implementing it as follows:

        bytes32 boardID = createBoardID(
            addressToUser[msg.sender].username,
            addressToUser[msg.sender].email
        );

        Board memory newBoard = Board({
            boardID: boardID,
            owner: payable(msg.sender),
            boardHeadline: _boardHeadline,
            boardDesc: _boardDesc,
            minQuestionPrice: _minQuestionPrice,
            createdAt: block.timestamp
        });

        boardIDToBoard[boardID] = newBoard;

        addressToUser[msg.sender].boardID = boardID;

        emit CreateBoard(
            boardID,
            payable(msg.sender),
            _boardHeadline,
            _boardDesc,
            _minQuestionPrice,
            block.timestamp
        );
    }

    function createUser(
        string calldata username,
        string calldata email,
        string calldata name,
        string calldata INSTAGRAM
    ) external {
        require(
            addressToUser[msg.sender].userAddress == address(0),
            "User already exists"
        );

        User memory newUser = User({
            userAddress: payable(msg.sender),
            username: username,
            email: email,
            name: name,
            boardID: 0,
            INSTAGRAM: INSTAGRAM
        });

        addressToUser[msg.sender] = newUser;

        emit CreateUser(
            payable(msg.sender),
            username,
            email,
            name,
            0,
            INSTAGRAM
        );
    }

    function askQuestion(
        bytes32 boardID,
        string calldata message,
        uint256 price
    ) external {
        require(
            boardIDToBoard[boardID].owner != address(0),
            "Board does not exist"
        );
        require(
            price >= boardIDToBoard[boardID].minQuestionPrice,
            "Price below minimum"
        );
        require(balances[msg.sender] >= price, "Insufficient funds");

        transfer(msg.sender, boardIDToBoard[boardID].owner, price);

        Question memory newQuestion = Question({
            message: message,
            askUser: payable(msg.sender),
            answerUser: boardIDToBoard[boardID].owner,
            price: price,
            timestamp: block.timestamp,
            boardID: boardID,
            isAnswered: false,
            isDeclined: false
        });

        uint256 questionIndex = boardIDToQuestions[boardID].length;
        boardIDToQuestions[boardID].push(newQuestion);

        emit AskQuestion(
            message,
            payable(msg.sender),
            boardIDToBoard[boardID].owner,
            block.timestamp,
            price,
            boardID,
            questionIndex
        );
    }

    function answerQuestion(
        bytes32 boardID,
        uint256 questionIndex,
        string calldata answer
    ) external {
        require(boardIDToBoard[boardID].owner == msg.sender, "Not authorized");
        require(
            !boardIDToQuestions[boardID][questionIndex].isAnswered,
            "Question already answered"
        );
        require(
            !boardIDToQuestions[boardID][questionIndex].isDeclined,
            "Question already declined"
        );

        boardIDToQuestions[boardID][questionIndex].isAnswered = true;

        uint256 reward = (boardIDToQuestions[boardID][questionIndex].price *
            answererRewardPercentage) / 100;
        transfer(address(this), msg.sender, reward);

        emit AnswerQuestion(
            boardID,
            questionIndex,
            payable(msg.sender),
            answer,
            block.timestamp
        );

        emit Transfer(address(this), payable(msg.sender), reward);
    }

    function declineQuestion(bytes32 boardID, uint256 questionIndex) external {
        require(boardIDToBoard[boardID].owner == msg.sender, "Not authorized");
        require(
            !boardIDToQuestions[boardID][questionIndex].isAnswered,
            "Question already answered"
        );
        require(
            !boardIDToQuestions[boardID][questionIndex].isDeclined,
            "Question already declined"
        );

        boardIDToQuestions[boardID][questionIndex].isDeclined = true;

        uint256 cancellationFee = (boardIDToQuestions[boardID][questionIndex]
            .price * questionCancellationFeePercentage) / 100;
        transfer(
            address(this),
            boardIDToQuestions[boardID][questionIndex].askUser,
            cancellationFee
        );

        emit DeclineQuestion(
            boardID,
            questionIndex,
            boardIDToQuestions[boardID][questionIndex].askUser,
            block.timestamp
        );

        emit Transfer(
            address(this),
            boardIDToQuestions[boardID][questionIndex].askUser,
            cancellationFee
        );
    }

    function getQuestion(
        bytes32 boardID,
        uint256 questionIndex
    )
        external
        view
        returns (
            string memory message,
            address payable askUser,
            address payable answerUser,
            uint256 price,
            uint256 timestamp,
            bytes32 boardID_,
            bool isAnswered,
            bool isDeclined
        )
    {
        return (
            boardIDToQuestions[boardID][questionIndex].message,
            boardIDToQuestions[boardID][questionIndex].askUser,
            boardIDToQuestions[boardID][questionIndex].answerUser,
            boardIDToQuestions[boardID][questionIndex].price,
            boardIDToQuestions[boardID][questionIndex].timestamp,
            boardIDToQuestions[boardID][questionIndex].boardID,
            boardIDToQuestions[boardID][questionIndex].isAnswered,
            boardIDToQuestions[boardID][questionIndex].isDeclined
        );
    }

    function getBoard(
        bytes32 boardID
    )
        external
        view
        returns (
            bytes32 boardID_,
            address payable owner,
            string memory boardHeadline,
            string memory boardDesc,
            uint256 minQuestionPrice,
            uint256 createdAt
        )
    {
        return (
            boardIDToBoard[boardID].boardID,
            boardIDToBoard[boardID].owner,
            boardIDToBoard[boardID].boardHeadline,
            boardIDToBoard[boardID].boardDesc,
            boardIDToBoard[boardID].minQuestionPrice,
            boardIDToBoard[boardID].createdAt
        );
    }

    function getUser(
        address userAddress
    )
        external
        view
        returns (
            address payable userAddress_,
            string memory username,
            string memory email,
            string memory name,
            bytes32 boardID,
            string memory INSTAGRAM
        )
    {
        return (
            addressToUser[userAddress].userAddress,
            addressToUser[userAddress].username,
            addressToUser[userAddress].email,
            addressToUser[userAddress].name,
            addressToUser[userAddress].boardID,
            addressToUser[userAddress].INSTAGRAM
        );
    }

    function getQuestionCount(bytes32 boardID) external view returns (uint256) {
        return boardIDToQuestions[boardID].length;
    }

    function getBoardID(address userAddress) external view returns (bytes32) {
        return addressToUser[userAddress].boardID;
    }

    function getOwner(bytes32 boardID) external view returns (address payable) {
        return boardIDToBoard[boardID].owner;
    }

    function getQuestionPrice(bytes32 boardID) external view returns (uint256) {
        return boardIDToBoard[boardID].minQuestionPrice;
    }

    function getQuestionAnsweringWindow() external view returns (uint256) {
        return questionAnsweringWindow;
    }

    function getQuestionCancellationFeePercentage()
        external
        view
        returns (uint256)
    {
        return questionCancellationFeePercentage;
    }

    function getAnswererRewardPercentage() external view returns (uint256) {
        return answererRewardPercentage;
    }

    function setQuestionAnsweringWindow(
        uint256 _questionAnsweringWindow
    ) external onlyOwner {
        questionAnsweringWindow = _questionAnsweringWindow;
    }

    function setQuestionCancellationFeePercentage(
        uint256 _questionCancellationFeePercentage
    ) external onlyOwner {
        questionCancellationFeePercentage = _questionCancellationFeePercentage;
    }

    function setAnswererRewardPercentage(
        uint256 _answererRewardPercentage
    ) external onlyOwner {
        answererRewardPercentage = _answererRewardPercentage;
    }

    function setQuestionPrice(
        bytes32 boardID,
        uint256 _minQuestionPrice
    ) external onlyOwner {
        boardIDToBoard[boardID].minQuestionPrice = _minQuestionPrice;
    }

    function setBoardHeadline(
        bytes32 boardID,
        string calldata _boardHeadline
    ) external onlyOwner {
        boardIDToBoard[boardID].boardHeadline = _boardHeadline;
    }

    function setBoardDesc(
        bytes32 boardID,
        string calldata _boardDesc
    ) external onlyOwner {
        boardIDToBoard[boardID].boardDesc = _boardDesc;
    }

    function setQuestionAnswered(
        bytes32 boardID,
        uint256 questionIndex,
        bool _isAnswered
    ) external onlyOwner {
        boardIDToQuestions[boardID][questionIndex].isAnswered = _isAnswered;
    }

    function setQuestionDeclined(
        bytes32 boardID,
        uint256 questionIndex,
        bool _isDeclined
    ) external onlyOwner {
        boardIDToQuestions[boardID][questionIndex].isDeclined = _isDeclined;
    }
}
