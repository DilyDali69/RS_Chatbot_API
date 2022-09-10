from twitchio.ext import commands
from twitchio.client import Client
import requests
import os

bot = commands.Bot(
    token=os.environ["TOKEN"],
    client_id=os.environ["CLIENT_ID"],
    nick=os.environ["NICK"],
    prefix=os.environ["PREFIX"],
    initial_channels=[os.environ["INITIAL_CHANNELS"]],
)


# client = Client(
#     client_id=null,
#     client_secret=null,
# )


@bot.event
async def event_message(ctx):
    print(ctx.author)
    print(ctx.content)
    await bot.handle_commands(ctx)


@bot.command(name='search_dilybot')
async def test_command(ctx):
    res = requests.get("http://localhost:8080/api/req?user=bongo&query=robot")
    data = res.json()
    string = data["data"]["songs"][0]["title"]

    print(ctx)

    await ctx.send(string)

@bot.command(name='test')
async def test_command(ctx):
    await ctx.send("this is a test response")


# @bot.command(name='who')
# async def get_chatters(ctx):
#     chatters = await client.get_chatters('incompetent_ian')
#     all_chatters = ' '.join(chatters.all)
#     await ctx.send(f"In chat: {all_chatters}")


if __name__ == '__main__':
    bot.run()