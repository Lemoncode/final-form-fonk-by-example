# 01 Setup final form

In this example we setup the basic plumbing to get up and running our project with React Final Form.

## Steps to build it

- Install project dependencies

```bash
npm install
```

- Let's start by installing Final Form

```bash
npm install final-form react-final-form --save
```

- Let's define a Final Form:

_./src/playground.jsx_

```diff
import React from 'react';
+ import { Form } from 'react-final-form';

export const Playground = () => {
  return (
    <div>
      <h1>React Final Form and Fonk</h1>
-     <h2>Playground</h2>
+     <h2>Wire transfer form</h2>
+     <Form
+       onSubmit={() => {}}
+       render={({ handleSubmit }) => (
+         <form onSubmit={handleSubmit}>
+         </form>
+       )}
+     />
    </div>
  );
};

```

- Time to define the initial data:

_./src/playground.jsx_

```diff
...
      <h2>Wire transfer form</h2>
      <Form
        onSubmit={() => {}}
+       initialValues={{
+         account: '',
+         name: '',
+         integerAmount: 0,
+         decimalAmount: 0,
+         reference: '',
+         email: '',
+       }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
          </form>
        )}
      />
```

- Now that we got the form let's place some fields, inside the _render_ prop:

_./src/playground.jsx_

```diff
...
      <h2>Wire transfer form</h2>
      <Form
        ...
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
+           <Field name="account">
+             {({ input }) => (
+               <div>
+                 <label>Beneficiary IBAN:</label>
+                 <input {...input} />
+               </div>
+             )}
+           </Field>
+           <Field name="name">
+             {({ input }) => (
+               <div>
+                 <label>Beneficiary fullname:</label>
+                 <input {...input} />
+               </div>
+             )}
+           </Field>
+           <div>
+             <label>Amount of wire:</label>
+             <Field name="integerAmount" type="number">
+               {({ input }) => <input {...input} />}
+             </Field>
+             <strong>.</strong>
+             <Field name="decimalAmount" type="number">
+               {({ input }) => (
+                 <>
+                   <input {...input} />
+                   <label>EUR</label>
+                 </>
+               )}
+             </Field>
+           </div>
+           <Field name="reference">
+             {({ input }) => (
+               <div>
+                 <label>Reference:</label>
+                 <input {...input} />
+               </div>
+             )}
+           </Field>
+           <p>
+             If you want to send a notice to the beneficiary, inform the e-mail
+           </p>
+           <Field name="email">
+             {({ input }) => (
+               <div>
+                 <label>Beneficiary Email:</label>
+                 <input {...input} />
+               </div>
+             )}
+           </Field>
          </form>
        )}
      />
```

- Let's add some code to handle the submit button (we will make a console.log showing the field values):

_./src/playground.jsx_

```diff
...
      <Form
-       onSubmit={() => {}}
+       onSubmit={values => {
+         console.log({ values });
+       }}
        initialValues={{
          account: '',
          name: '',
          integerAmount: 0,
          decimalAmount: 0,
          reference: '',
          email: '',
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            ...
            <Field name="email">
              {({ input }) => (
                <div>
                  <label>Beneficiary Email:</label>
                  <input {...input} />
                </div>
              )}
            </Field>
+           <div className="buttons">
+             <button type="submit">Submit</button>
+           </div>
          </form>
        )}
      />
```

- Play with demo:

[![React Final Form and Fonk 01-setup-final-form example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/final-form-fonk-by-example/tree/master/01-setup-final-form)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
