# Made 4 Mom - a Mother's Day card project

This repo is home to documentation and an example plugin for
https://made4mom.com -- a WebAssembly plugin greeting card proejct.

## Making a card

All of these instructions assume you already have a _guest account_ after
filling out the invitation page on https://made4mom.com... if not, please do
that first!

### Using the `xtp` CLI

1. Download the `xtp` CLI:

```sh
curl https://static.dylibso.com/cli/install.sh | sudo sh
```

Once you've accepted your invitation from Made4Mom via email, you will be logged
into the browser application at https://xtp.dylibso.com -- XTP is a plugin
life-cycle management platform that you will interact with behind the scenese to
test & push a greeting card plugin.

If you're indeed logged in, you can authenticate via the `xtp` CLI and can
create your plugin.

```sh
xtp auth login
```

Follow the steps, and by the end you should see your information when running:

```sh
xtp auth whoami
```

### Generate a plugin scaffold

```sh
xtp plugin init
```

Then, take a look at the example plugin in this repo for some inspiration.
You'll see that there are 3 functions you need to implement.

These functions coform to the following interface:

```typescript
type I32 = number;

declare module "main" {
  // sets plugin output as HTML to be rendered into the front of the greeting card.
  export function create_front_layout(): I32;

  // sets plugin output as HTML to be rendered into the inside of the greeting card.
  export function create_card_layout(): I32;

  // enables your plugin to handle a POST request to itself, so you can add some state and interactivity to your card.
  // the input to this plugin is the body of the POST request.
  export function handle_post_request(): I32;
}
```

You don't have to write your plugin in TypeScript -- you can use any of the
[Extism PDK](https://github.com/extism/extism?tab=readme-ov-file#compile-webassembly-to-run-in-extism-hosts)
languages to write a plugin and compile it to WebAssembly.

Just make sure the `xtp.toml` in the root of your project can locate the plugin
binary .wasm file so when you run `xtp plugin push`, the file is uploaded and
processed accordingly.

### Need help?

Come chat with us on the [Extism Discord](https://extism.org/discord)!
