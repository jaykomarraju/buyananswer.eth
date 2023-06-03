use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod BuyAnAnswerContract {
    use super::*;

    pub fn create_contract(ctx: Context<CreateContract>, fee_address: Pubkey) -> ProgramResult {
        let contract = &mut ctx.accounts.contract;
        contract.fee_address = fee_address;
        contract.latest_question_id = 0;
        Ok(())
    }

    pub fn ask_question(ctx: Context<AskQuestion>, amount: u64, answerer: Pubkey) -> ProgramResult {
        let contract = &mut ctx.accounts.contract;
        contract.latest_question_id += 1;

        let question = Question {
            id: contract.latest_question_id,
            asker: *ctx.accounts.asker.key,
            answerer: answerer,
            amount: amount,
            answered: false,
            cancelled: false,
        };

        contract.questions.push(question);

        Ok(())
    }

    pub fn answer_question(ctx: Context<AnswerQuestion>, question_id: u64) -> ProgramResult {
        let contract = &mut ctx.accounts.contract;
        for question in &mut contract.questions {
            if question.id == question_id && question.answerer == *ctx.accounts.answerer.key {
                question.answered = true;
                return Ok(());
            }
        }
        Err(ErrorCode::QuestionNotFound.into())
    }

    pub fn decline_question(ctx: Context<DeclineQuestion>, question_id: u64) -> ProgramResult {
        let contract = &mut ctx.accounts.contract;
        for question in &mut contract.questions {
            if question.id == question_id && question.answerer == *ctx.accounts.answerer.key {
                question.cancelled = true;
                return Ok(());
            }
        }
        Err(ErrorCode::QuestionNotFound.into())
    }

    pub fn cancel_question(ctx: Context<CancelQuestion>, question_id: u64) -> ProgramResult {
        let contract = &mut ctx.accounts.contract;
        for question in &mut contract.questions {
            if question.id == question_id && question.asker == *ctx.accounts.asker.key {
                question.cancelled = true;
                return Ok(());
            }
        }
        Err(ErrorCode::QuestionNotFound.into())
    }
}

#[derive(Accounts)]
pub struct CreateContract<'info> {
    #[account(init, payer = user, space = 8 + 8 + 8 + (32 + 8) * 32)]
    pub contract: Account<'info, Contract>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AskQuestion<'info> {
    pub contract: Account<'info, Contract>,
    #[account(signer)]
    pub asker: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AnswerQuestion<'info> {
    pub contract: Account<'info, Contract>,
    #[account(signer)]
    pub answerer: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeclineQuestion<'info> {
    pub contract: Account<'info, Contract>,
    #[account(signer)]
    pub answerer: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelQuestion<'info> {
    pub contract: Account<'info, Contract>,
    #[account(signer)]
    pub asker: AccountInfo<'info>,
}

#[account]
pub struct Contract {
    pub fee_address: Pubkey,
    pub latest_question_id: u64,
    pub questions: Vec<Question>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Question {
    pub id: u64,
    pub asker: Pubkey,
    pub answerer: Pubkey,
    pub amount: u64,
    pub answered: bool,
    pub cancelled: bool,
}

#[error]
pub enum ErrorCode {
    #[msg("Question not found")]
    QuestionNotFound,
}
