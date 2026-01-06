"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Button } from "@/components/ui/button";

export function HeaderSection1({userData, onLogout}) {

  return (
    <section
      className="bg-background section-padding-y"
      aria-labelledby="page-heading">
      <div className="container-padding-x container mx-auto">
        <div
          className="section-title-gap-xl mx-auto flex max-w-xl flex-1 flex-col items-center text-center">
          <div className="section-title-gap-xl flex flex-col items-center">
            <Tagline>Header section</Tagline>
            <h1 id="page-heading" className="heading-xl text-foreground">
              Welcome {userData.name}
            </h1>
            <p
              className="text-muted-foreground text-base lg:text-lg"
              aria-description="page description">
              User is authentified with email: {userData.email}
            </p>
            <p
              className="text-muted-foreground text-base lg:text-lg"
              aria-description="page description">
              and has role: {userData.role}
            </p>
            <Button onClick={onLogout}>Log out</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
