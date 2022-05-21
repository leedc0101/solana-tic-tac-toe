use anchor_lang::prelude::*;
use instructions::*;
use state::game::Tile;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("CYzR5AD2M3s9rYkEHxsjP169mmHmtSFq74R6263BhKZw");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn setup_game(ctx: Context<SetupGame>, player_one: Pubkey, player_two: Pubkey) -> Result<()> {
        instructions::setup_game::setup_game(ctx, player_one, player_two)
    }

    pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
        instructions::play::play(ctx, tile)
    }
}