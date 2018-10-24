import React, { Component } from "react";
// import Footer from "../Footer/Footer";
import "./Social.css";

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  //   TelegramShareButton,
  //   WhatsappShareButton,
  PinterestShareButton
  //   VKShareButton,
  //   OKShareButton,
  //   RedditShareButton,
  //   TumblrShareButton,
  //   LivejournalShareButton,
  //   MailruShareButton,
  //   ViberShareButton,
  //   WorkplaceShareButton,
  //   EmailShareButton
} from "react-share";

//Share Counters
import {
  FacebookShareCount,
  LinkedinShareCount,
  PinterestShareCount
  //   VKShareCount,
  //   OKShareCount,
  //   RedditShareCount,
  //   TumblrShareCount
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  //   TelegramIcon,
  //   WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon
  //   VKIcon,
  //   OKIcon,
  //   RedditIcon,
  //   TumblrIcon,
  //   LivejournalIcon,
  //   MailruIcon,
  //   ViberIcon,
  //   WorkplaceIcon,
  //   EmailIcon
} from "react-share";

export default class Social extends Component {
  render() {
    return (
      <div className="social_container">
        <div>
          <FacebookShareButton
            children={<FacebookIcon size={32} round={true} />}
            url="sample.com"
            quote="to be or not to be"
            hashtag="#romace"
          />
          <FacebookShareCount url={"sample.com"}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </FacebookShareCount>
        </div>
        <div>
          <GooglePlusShareButton
            children={<GooglePlusIcon size={32} round={true} />}
            url="sample.com"
          />
        </div>
        <div>
          <TwitterShareButton
            children={<TwitterIcon size={32} round={true} />}
            url="sample.com"
            via="string"
            hashtag="#romace"
          />
        </div>
        <div>
          <PinterestShareButton
            children={<PinterestIcon size={32} round={true} />}
            url="sample.com"
            media="An absolute link to the image that will be pinned (string)"
          />
          <PinterestShareCount url={"sample.com"}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </PinterestShareCount>
        </div>
        <div>
          <LinkedinShareButton
            children={<LinkedinIcon size={32} round={true} />}
            url="sample.com"
            title="string"
            description="string"
          />
          <LinkedinShareCount url={"sample.com"}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </LinkedinShareCount>
        </div>
      </div>
    );
  }
}
