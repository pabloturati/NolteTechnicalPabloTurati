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
    const { shareURL, pinImage, venueName } = this.props;
    const icoSize = 50;
    return (
      <div className="social_container">
        <div>
          <FacebookShareButton
            children={<FacebookIcon size={icoSize} round={true} />}
            url={shareURL}
            quote={venueName}
            hashtag={`#${venueName}`}
          />
          <FacebookShareCount url={shareURL}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </FacebookShareCount>
        </div>
        <div>
          <GooglePlusShareButton
            children={<GooglePlusIcon size={icoSize} round={true} />}
            url={shareURL}
          />
        </div>
        <div>
          <TwitterShareButton
            children={<TwitterIcon size={icoSize} round={true} />}
            url={shareURL}
            via={venueName}
            hashtag={`#${venueName}`}
          />
        </div>
        <div>
          <PinterestShareButton
            children={<PinterestIcon size={icoSize} round={true} />}
            url={shareURL}
            media={pinImage}
          />
          <PinterestShareCount url={shareURL}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </PinterestShareCount>
        </div>
        <div>
          <LinkedinShareButton
            children={<LinkedinIcon size={icoSize} round={true} />}
            url={shareURL}
            title={venueName}
            description={`#${venueName}`}
          />
          <LinkedinShareCount url={shareURL}>
            {shareCount => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </LinkedinShareCount>
        </div>
      </div>
    );
  }
}
