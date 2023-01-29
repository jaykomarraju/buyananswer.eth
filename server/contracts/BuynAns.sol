pragma solidity >=0.5.0 <0.9.0;

contract BuynAns {
    // Users will answer questions from other users while charging a fee
    // This means the asker user will pay the fee to the answerer user
    // The fee will be paid in the form form of ETH directly as soon as the answer is submitted

    // When the asker user asks the question, they will specify the fee they are willing to pay
    // They will also deposit the fee in the contract
    // The answerer user can choose to answer the question or not
    // If they choose to answer the question, they will be paid the fee
    // If they choose not to answer the question, the fee will be returned to the asker user

    // The asker user will also specify the time limit for the answerer user to answer the question
    // If the answerer user does not answer the question within the time limit, the fee will be returned to the asker user

    // This contract will be used for all functionality related to the BuynAns platform

    event QuestionAsked(
        address indexed asker,
        uint256 indexed questionId,
        string question,
        uint256 fee,
        uint256 timeLimit
    );

    event QuestionAnswered(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionAnsweredLate(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionAnsweredEarly(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionAnsweredOnTime(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionAnsweredAndFeeReturned(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionAnsweredAndFeePaid(
        address indexed answerer,
        uint256 indexed questionId,
        string answer
    );

    event QuestionDeclined(
        address indexed answerer,
        uint256 indexed questionId
    );

    event DepositMade(
        address indexed depositor,
        uint256 indexed questionId,
        uint256 amount
    );

    event FeeReturned(
        address indexed depositor,
        uint256 indexed questionId,
        uint256 amount
    );

    event FeePaid(
        address indexed depositor,
        uint256 indexed questionId,
        uint256 amount
    );

    struct Question {
        address payable asker;
        address payable answerer;
        string question;
        string answer;
        uint256 fee;
        uint256 timeLimit;
        bool isAnswered;
        bool isAnsweredLate;
        bool isAnsweredEarly;
        bool isAnsweredOnTime;
        bool isAnsweredAndFeeReturned;
        bool isAnsweredAndFeePaid;
        bool isDeclined;
        bool isDepositMade;
        bool isFeeReturned;
        bool isFeePaid;
    }

    mapping(uint256 => Question) public questions;
    mapping(uint256 => mapping(address => bool)) public answers;
    mapping(uint256 => mapping(address => bool)) public deposits;
    mapping(uint256 => mapping(address => bool)) public feesReturned;
    mapping(uint256 => mapping(address => bool)) public feesPaid;

    uint256 public questionCount = 0;

    // APPLICATION LOGIC

    function askQuestion(
        string memory _question,
        uint256 _fee,
        uint256 _timeLimit
    ) public {
        // Ask a question
        // The asker user will specify the fee they are willing to pay
        // They will also deposit the fee in the contract
        // The answerer user can choose to answer the question or not
        // If they choose to answer the question, they will be paid the fee
        // If they choose not to answer the question, the fee will be returned to the asker user

        // The asker user will also specify the time limit for the answerer user to answer the question
        // If the answerer user does not answer the question within the time limit, the fee will be returned to the asker user

        // Make sure the fee is not 0
        require(_fee > 0, "Fee must be greater than 0");

        // Make sure the time limit is not 0
        require(_timeLimit > 0, "Time limit must be greater than 0");

        // Increment question count
        questionCount++;

        // Add question to contract
        questions[questionCount] = Question(
            payable(msg.sender),
            payable(address(0)),
            _question,
            "",
            _fee,
            _timeLimit,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        );

        // Emit event
        emit QuestionAsked(
            msg.sender,
            questionCount,
            _question,
            _fee,
            _timeLimit
        );
    }

    function answerQuestion(uint256 _questionId, string memory _answer)
        public
        payable
    {
        // Fetch the question
        Question memory _question = questions[_questionId];

        // Make sure the question exists
        require(_question.asker != address(0), "Question does not exist");

        // Make sure the question has not been answered
        require(!_question.isAnswered, "Question has already been answered");

        // Make sure the question has not been declined
        require(!_question.isDeclined, "Question has already been declined");

        // Make sure the question has not been answered late
        require(
            !_question.isAnsweredLate,
            "Question has already been answered late"
        );

        // Make sure the question has not been answered early
        require(
            !_question.isAnsweredEarly,
            "Question has already been answered early"
        );

        // Make sure the question has not been answered on time
        require(
            !_question.isAnsweredOnTime,
            "Question has already been answered on time"
        );

        // Make sure the question has not been answered and fee returned
        require(
            !_question.isAnsweredAndFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isAnsweredAndFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isDepositMade,
            "Question has already been answered and fee paid"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value == _question.fee,
            "Fee must be equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value >= _question.fee,
            "Fee must be greater than or equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value <= _question.fee,
            "Fee must be less than or equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(msg.value > 0, "Fee must be greater than 0");
    }

    function declineQuestion(uint256 _questionId) public {
        // Fetch the question
        Question memory _question = questions[_questionId];

        // Make sure the question exists
        require(_question.asker != address(0), "Question does not exist");

        // Make sure the question has not been answered
        require(!_question.isAnswered, "Question has already been answered");

        // Make sure the question has not been declined
        require(!_question.isDeclined, "Question has already been declined");

        // Make sure the question has not been answered late
        require(
            !_question.isAnsweredLate,
            "Question has already been answered late"
        );

        // Make sure the question has not been answered early
        require(
            !_question.isAnsweredEarly,
            "Question has already been answered early"
        );

        // Make sure the question has not been answered on time
        require(
            !_question.isAnsweredOnTime,
            "Question has already been answered on time"
        );

        // Make sure the question has not been answered and fee returned
        require(
            !_question.isAnsweredAndFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isAnsweredAndFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isDepositMade,
            "Question has already been answered and fee paid"
        );

        // Make sure the answerer user is not the asker user
        require(
            msg.sender != _question.asker,
            "Answerer user cannot be the asker user"
        );

        // Make sure the answerer user is not the asker user
        require(
            msg.sender == _question.asker,
            "Answerer user must be the asker user"
        );

        // Make sure the answerer user is not the asker user
        require(
            msg.sender != _question.asker,
            "Answerer user must not be the asker user"
        );
    }

    function answerQuestionLate(uint256 _questionId, string memory _answer)
        public
        payable
    {
        // Fetch the question
        Question memory _question = questions[_questionId];

        // Make sure the question exists
        require(_question.asker != address(0), "Question does not exist");

        // Make sure the question has not been answered
        require(!_question.isAnswered, "Question has already been answered");

        // Make sure the question has not been declined
        require(!_question.isDeclined, "Question has already been declined");

        // Make sure the question has not been answered late
        require(
            !_question.isAnsweredLate,
            "Question has already been answered late"
        );

        // Make sure the question has not been answered early
        require(
            !_question.isAnsweredEarly,
            "Question has already been answered early"
        );

        // Make sure the question has not been answered on time
        require(
            !_question.isAnsweredOnTime,
            "Question has already been answered on time"
        );

        // Make sure the question has not been answered and fee returned
        require(
            !_question.isAnsweredAndFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isAnsweredAndFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isDepositMade,
            "Question has already been answered and fee paid"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value == _question.fee,
            "Fee must be equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value >= _question.fee,
            "Fee must be greater than or equal to the question fee"
        );
    }

    function answerQuestionEarly(uint256 _questionId, string memory _answer)
        public
        payable
    {
        // Fetch the question
        Question memory _question = questions[_questionId];

        // Make sure the question exists
        require(_question.asker != address(0), "Question does not exist");

        // Make sure the question has not been answered
        require(!_question.isAnswered, "Question has already been answered");

        // Make sure the question has not been declined
        require(!_question.isDeclined, "Question has already been declined");

        // Make sure the question has not been answered late
        require(
            !_question.isAnsweredLate,
            "Question has already been answered late"
        );

        // Make sure the question has not been answered early
        require(
            !_question.isAnsweredEarly,
            "Question has already been answered early"
        );

        // Make sure the question has not been answered on time
        require(
            !_question.isAnsweredOnTime,
            "Question has already been answered on time"
        );

        // Make sure the question has not been answered and fee returned
        require(
            !_question.isAnsweredAndFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isAnsweredAndFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isDepositMade,
            "Question has already been answered and fee paid"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value == _question.fee,
            "Fee must be equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value >= _question.fee,
            "Fee must be greater than or equal to the question fee"
        );

        // Make sure the answer
    }

    function answerQuestionOnTime(uint256 _questionId, string memory _answer)
        public
        payable
    {
        // Fetch the question
        Question memory _question = questions[_questionId];

        // Make sure the question exists
        require(_question.asker != address(0), "Question does not exist");

        // Make sure the question has not been answered
        require(!_question.isAnswered, "Question has already been answered");

        // Make sure the question has not been declined
        require(!_question.isDeclined, "Question has already been declined");

        // Make sure the question has not been answered late
        require(
            !_question.isAnsweredLate,
            "Question has already been answered late"
        );

        // Make sure the question has not been answered early
        require(
            !_question.isAnsweredEarly,
            "Question has already been answered early"
        );

        // Make sure the question has not been answered on time
        require(
            !_question.isAnsweredOnTime,
            "Question has already been answered on time"
        );

        // Make sure the question has not been answered and fee returned
        require(
            !_question.isAnsweredAndFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isAnsweredAndFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeeReturned,
            "Question has already been answered and fee returned"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isFeePaid,
            "Question has already been answered and fee paid"
        );

        // Make sure the question has not been answered and fee paid
        require(
            !_question.isDepositMade,
            "Question has already been answered and fee paid"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value == _question.fee,
            "Fee must be equal to the question fee"
        );

        // Make sure the answerer user has paid the fee
        require(
            msg.value >= _question.fee,
            "Fee must be greater than or equal to the question fee"
        );

        // Make sure the
    }

    // Getters

    // function getQuestionsLength() public view returns (uint256) {
    //     return questions.length;
    // }

    function getQuestionsFromUser(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return questionsFromUser[_user];
    }

    function getQuestionsToUser(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return questionsToUser[_user];
    }

    function getQuestion(uint256 _questionId)
        public
        view
        returns (
            address asker,
            address answerer,
            string memory question,
            string memory answer,
            uint256 fee,
            // uint256 deadline,
            bool isAnswered,
            bool isDeclined,
            bool isAnsweredLate,
            bool isAnsweredEarly,
            bool isAnsweredOnTime,
            bool isAnsweredAndFeeReturned,
            bool isAnsweredAndFeePaid,
            bool isFeeReturned,
            bool isFeePaid,
            bool isDepositMade
        )
    {
        Question memory _question = questions[_questionId];

        return (
            _question.asker,
            _question.answerer,
            _question.question,
            _question.answer,
            _question.fee,
            // _question.deadline,
            _question.isAnswered,
            _question.isDeclined,
            _question.isAnsweredLate,
            _question.isAnsweredEarly,
            _question.isAnsweredOnTime,
            _question.isAnsweredAndFeeReturned,
            _question.isAnsweredAndFeePaid,
            _question.isFeeReturned,
            _question.isFeePaid,
            _question.isDepositMade
        );
    }

    function getQuestionLengthFromUser(address _user)
        public
        view
        returns (uint256)
    {
        return questionsFromUser[_user].length;
    }

    function getQuestionLengthToUser(address _user)
        public
        view
        returns (uint256)
    {
        return questionsToUser[_user].length;
    }

    function getQuestionFromUserByIndex(address _user, uint256 _index)
        public
        view
        returns (uint256)
    {
        return questionsFromUser[_user][_index];
    }

    function getQuestionToUserByIndex(address _user, uint256 _index)
        public
        view
        returns (uint256)
    {
        return questionsToUser[_user][_index];
    }

    function getQuestionFromUserByIndexAndLength(
        address _user,
        uint256 _index,
        uint256 _length
    ) public view returns (uint256[] memory) {
        uint256[] memory _questions = new uint256[](_length);

        for (uint256 i = 0; i < _length; i++) {
            _questions[i] = questionsFromUser[_user][_index + i];
        }

        return _questions;
    }

    function getQuestionToUserByIndexAndLength(
        address _user,
        uint256 _index,
        uint256 _length
    ) public view returns (uint256[] memory) {
        uint256[] memory _questions = new uint256[](_length);

        for (uint256 i = 0; i < _length; i++) {
            _questions[i] = questionsToUser[_user][_index + i];
        }

        return _questions;
    }

    mapping(address => uint256[]) private questionsFromUser;
    mapping(address => uint256[]) private questionsToUser;
}
