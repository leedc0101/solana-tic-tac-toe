use crate::state::game::*;
use anchor_lang::prelude::*;

pub fn setup_game(ctx: Context<SetupGame>, player_one: Pubkey, player_two: Pubkey) -> Result<()> {
    ctx.accounts
        .game
        .start([player_one, player_two])
}

#[derive(Accounts)]
pub struct SetupGame<'info> {
    #[account(init, payer = payer , space = Game::MAXIMUM_SIZE + 8)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}